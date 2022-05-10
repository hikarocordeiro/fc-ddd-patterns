import EventHandlerInterface from "../../../../@shared/event/event-handler.interface";
import CustomerChangedEvent from "../customer-address-changed.event";

export default class EnviaConsoleLogHandler
  implements EventHandlerInterface<CustomerChangedEvent>
{
  handle(event: CustomerChangedEvent): void {
    const { id, name, Address } = event.eventData;
    console.log(`Endereço do cliente: ${id}, ${name} alterado para: ${Address.toString()}`); 
  }
}
