import fastify from "fastify";
import fs from "fs";
import path from "path";
import { JSONmethods } from "./JSONmethods.mjs";

export class ContactCard {
  surname;
  name;
  telephone;
  email;

  constructor(surname, name, email, telephone = null) {
    this.surname = surname;
    this.name = name;
    this.telephone = telephone;
    this.email = email;
  }
}

export class AddressBook {
  contacts = [];
  path = "./AddressBook.json";

  constructor() {
    const hasfile = JSONmethods.fileJSONExists;
    if (!hasfile) {
      JSONmethods.createJSONFile;
    }
    JSONmethods.readJSONFile;
  }

  // fileJSONExists() {
  //   try {
  //     return fs.existsSync(this.path);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  add(contactCard) {
    /*
         FIXME: se aggiungo due volte lo stesso contatto avrò un duplicato!
         */

    const hasAlreadyContact = this.contacts.find(
      (contact) => contact.email === contactCard.email
    );
    if (hasAlreadyContact) {
      return "L' utente è già registrato";
    }

    this.contacts.push(contactCard);
    JSONmethods.storeJSONFile;
    return contactCard;
  }

  searchBySurname(surname) {
    return this.contacts.filter((card) => card.surname === surname);
  }

  searchByEmail(email) {
    return this.contacts.filter((card) => card.email === email);
  }

  getContact(email) {
    return this.contacts.find((contact) => contact.email === email);
  }

  updateContact({ surname, name, email, telephone, newEmail }) {
    const contact = this.contacts.find((contact) => {
      if (contact.email === email) {
        contact.name = name ? name : contact.name;
        contact.surname = surname ? surname : contact.surname;
        contact.telephone = telephone ? telephone : contact.telephone;
        contact.email = newEmail ? newEmail : contact.email;
      }
      return contact.email === email;
    });
    if (contact)    JSONmethods.storeJSONFile;
    console.log(this.contacts);
    return contact
      ? "Utente aggiornato"
      : "ERRORE nessun utente con mail trovato";
  }
  deleteContact(email) {
    let ErrMessage = "Non esiste utente con questa mail";
    this.contacts = this.contacts.filter((contact) => {
      if (contact.email === email) {
        ErrMessage = "Utente eliminato";
           JSONmethods.storeJSONFile;

      }

      return contact.email !== email;
    });
    console.log("Sto eliminando questo", this.contacts);
    return ErrMessage;
  }

  // createJSONFile() {
  //   try {
  //     fs.writeFileSync(
  //       "AddressBook.json",
  //       JSON.stringify({ contacts: this.contacts })
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // readJSONFile() {
  //   try {
  //     const jsonfile = JSON.parse(fs.readFileSync(this.path));
  //     this.contacts = [...jsonfile.contacts];
  //     console.log(jsonfile.contacts);
  //   } catch (error) {
  //     console.log("File non letto");
  //   }
  // }
  // storeJSONFile() {
  //   try {
  //     fs.writeFileSync(
  //       "AddressBook.json",
  //       JSON.stringify({ contacts: this.contacts })
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}
