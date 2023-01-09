import Fastify from "fastify";
import { ContactCard, AddressBook } from "./entities/address-book.mjs";


/**
 * @param {number} port
 * @param {AddressBook} addressBook
 */
export function createFastifyServer(port, addressBook) {
  const fast = Fastify({ logger: true });

  fast.get("/", function (request, response) {
    response.send({ hello: "world" });
  });

  fast.get("/surname/:srn", function (request, response) {
    const requestedSurname = request.params["srn"];
    return addressBook.searchBySurname(requestedSurname);
  });

  fast.get("/email/:email", function (request, response) {
    return addressBook.searchByEmail(request.params["email"]);
  });

  fast.post("/add", function (request, reply) {
    const { name, surname, email, telephone } = request.body;

    addressBook.add(new ContactCard(surname, name, email, telephone));
    console.log("hai salvato:", addressBook.contacts);
    return "OOK";
  });

  fast.patch("/update", function (request, reply) {
    if (request.body.email) {
      return addressBook.updateContact(request.body);
    }
    return "ERRORE non hai inserito una mail";
  });

  fast.delete("/delete", function (request, reply) {
    if (request.body.email) {
      return addressBook.deleteContact(request.body.email);
    }
    return "ERRORE non hai inserito una mail";
  });

  fast.listen({ port }, function (err, address) {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    console.log("Fastify server listening on ", address);
  });
}
