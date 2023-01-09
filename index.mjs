import { ContactCard, AddressBook } from './entities/address-book.mjs';
import { createFastifyServer } from './fastifyserver.mjs';
import { createHttpServer } from './httpserver.mjs';


const addressBook = new AddressBook();

addressBook.add(new ContactCard('Barra', 'Domenico', 'd.barra@example.com','1423214', ));
addressBook.add(new ContactCard('Barra', 'Mario', 'm.barra@example.com','1529827', ));
addressBook.add(new ContactCard('Rossi', 'Mario', 'm.rossi@example.com','2309528', ));


createHttpServer(3000, addressBook);
createFastifyServer(4000, addressBook);