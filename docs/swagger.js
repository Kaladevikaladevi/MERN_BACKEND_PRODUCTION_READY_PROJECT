import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Day 8 API",
      version: "1.0.0",
      description: "Swagger Documentation with JWT",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./routes/*.js"], // files containing annotations
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
