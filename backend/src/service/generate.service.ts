import { randomBytes } from "crypto";

class generateService {
  generateActivationLink() {
    return randomBytes(32).toString("hex");
  }
}

export default new generateService();
