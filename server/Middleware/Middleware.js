import jwt from "jsonwebtoken";
const SECRET_KEY = "NOTESAPI ";
const filter = (req, res, next) => {
  try {
    let token = req.header("authorization");
    console.log(token);
    if (token) {
      // console.log(token)
      let user = jwt.verify(token, SECRET_KEY);
      req.userId = user.id;
      console.log(req.userId);
    } else {
      res.status(401).json({ message: " Unauthorized user" });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: " Unauthorized user" });
  }
};

export default filter;
