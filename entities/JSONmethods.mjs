import fs from "fs";
import path from "path";
import { ContactCard, AddressBook } from "./address-book.mjs";


export class JSONmethods {

  fileJSONExists() {
    try {
        return fs.existsSync("./AddressBook.json");
    } catch (error) {
      console.log(error);
    }
  }
  createJSONFile() {
    try {
      fs.writeFileSync(
        "AddressBook.json",
        JSON.stringify({ contacts: this.contacts })
      );
    } catch (error) {
      console.log(error);
    }
  }
  readJSONFile() {
    try {
      const jsonfile = JSON.parse(fs.readFileSync(this.path));
      this.contacts = [...jsonfile.contacts];
      console.log(jsonfile.contacts);
    } catch (error) {
      console.log("File non letto");
    }
  }
  storeJSONFile() {
    try {
      fs.writeFileSync(
        "AddressBook.json",
        JSON.stringify({ contacts: this.contacts })
      );
    } catch (error) {
      console.log(error);
    }
  }
}
