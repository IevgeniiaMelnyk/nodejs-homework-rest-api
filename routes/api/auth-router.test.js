const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../../app");
const { User } = require("../../models/user");

const { DB_HOST_TEST, PORT = 3000 } = process.env;

describe("test /api/users/register route", () => {
  let server = null;
  beforeAll(async () => {
    server = app.listen(PORT);
    await mongoose.connect(
      "mongodb+srv://Ievgeniia:kUf3L9Ucg7NTyJT2@contacts.bhrbwmq.mongodb.net/contacts_reader_test?retryWrites=true&w=majority"
    );
  });

  afterAll(async () => {
    server.close();
    await mongoose.connection.close();
  });

  beforeEach(() => {});

  afterEach(async () => {
    await User.deleteMany({});
  });

  test("test register route with correct data", async () => {
    const registerData = {
      name: "Johnny",
      email: "johnny@gmail.com",
      password: "111111",
      subscription: "starter",
    };

    const res = await request(app)
      .post("/api/users/register")
      .send(registerData);

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe(registerData.name);
    expect(res.body.email).toBe(registerData.email);
    expect(res.body.subscription).toBe(registerData.subscription);

    const user = await User.findOne({ email: registerData.email });
    expect(user.name).toBe(registerData.name);
  });
});
