import { User } from "../database/models";
import { hashPassword, comparePassword, jwtToken } from "../utils/jwtToken";

class Auth {
  static async signUp(req, res) {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = hashPassword(password);

      const user = await User.findOne({ where: { email } });
      if (user) {
        return res.status(409).send({
          message: "User already exists",
        });
      }
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
      });
      return res
        .status(201)
        .send({ message: "User successfully created", newUser });
    } catch (error) {
      return res.status(500).send({ message: "Server error" });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });

      if (user && comparePassword(password, user.password)) {
        const token = jwtToken.createToken(user);
        return res
          .status(200)
          .send({ message: "user logged in successfully", token });
      }
      return res.status(401).send({ message: "wrong credentials" });
    } catch (error) {
      return res.status(500).send({ message: "Server error" });
    }
  }
}

export default Auth;
