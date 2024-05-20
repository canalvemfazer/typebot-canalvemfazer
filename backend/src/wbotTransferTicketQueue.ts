import { Op } from "sequelize";
import TicketTraking from "./models/TicketTraking";
import { format } from "date-fns";
import moment from "moment";
import Ticket from "./models/Ticket";
import Whatsapp from "./models/Whatsapp";
import { getIO } from "./libs/socket";
import { logger } from "./utils/logger";
import ShowTicketService from "./services/TicketServices/ShowTicketService";


export const TransferTicketQueue = async (): Promise<void> => {

  const io = getIO();

  //buscar os tickets que em pendentes e sem fila
  const tickets = await Ticket.findAll({
    where: {
      status: "pending",
      queueId: {
        [Op.is]: null
      },
    },

  });

  // varrer os tickets e verificar se algum deles está com o tempo estourado
  tickets.forEach(async ticket => {



    const wpp = await Whatsapp.findOne({
      where: {
        id: ticket.whatsappId
      }
    });

    if (!wpp || !wpp.timeToTransfer || !wpp.transferQueueId || wpp.timeToTransfer == 0) return;

    let dataLimite = new Date(ticket.updatedAt);
    dataLimite.setMinutes(dataLimite.getMinutes() + wpp.timeToTransfer);

    if (new Date() > dataLimite) {

      await ticket.update({

        queueId: wpp.transferQueueId,

      });

      const ticketTraking = await TicketTraking.findOne({
        where: {
          ticketId: ticket.id
        },
        order: [["createdAt", "DESC"]]
      });

      await ticketTraking.update({
        queuedAt: moment().toDate(),
        queueId: wpp.transferQueueId,
      });

      const currentTicket = await ShowTicketService(ticket.id, ticket.companyId);

      io.to(ticket.status)
        .to("notification")
        .to(ticket.id.toString())
        .emit(`company-${ticket.companyId}-ticket`, {
          action: "update",
          ticket: currentTicket,
          traking: "created ticket 33"
        });

      logger.info(`Transferencia de ticket automatica ticket id ${ticket.id} para a fila ${wpp.transferQueueId}`);

    }


  });


}
