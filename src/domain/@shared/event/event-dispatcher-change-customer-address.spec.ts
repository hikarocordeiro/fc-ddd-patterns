
import Customer from "../../customer/entity/customer";
import CustomerAddressChangedEvent from "../../customer/entity/event/customer-address-changed.event";
import EnviaConsoleLogHandler from "../../customer/entity/event/handler/envia-console-log.handler";
import Address from "../../customer/value-object/address";

import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLogHandler();

    eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"].length).toBe(
      1
    );

    expect( eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0] ).toMatchObject(eventHandler);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLogHandler();

    eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister("CustomerAddressChangedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"].length).toBe(
      0
    );
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLogHandler();

    eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]
    ).toBeUndefined();
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();

    const customer = new Customer("123", "John Doe");
    const address = new Address("Rua 1", 1, "76300000", "Goiânia");
    customer.changeAddress(address);

    const customerAddressChangedEvent = new CustomerAddressChangedEvent(customer);

    const eventHandler = new EnviaConsoleLogHandler();

    eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.notify(customerAddressChangedEvent);

    expect(spyEventHandler).toHaveBeenCalled();

    expect(spyEventHandler).toHaveBeenCalledWith(customerAddressChangedEvent);
  });
});
