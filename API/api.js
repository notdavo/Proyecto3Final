var DB = require("./DBConfig"); 
const DBOperations = require("./DBOperations");


var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", router);

router.route("/GetNombresPlanta").get((request, response) => {
  DBOperations.GetNombresPlanta().then((result) => {
    response.json(result[0]);
  });
});

router.route("/GetVDesigns").get((request, response) => {
  DBOperations.GetVDesigns().then((result) => {
    response.json(result[0]);
  });
});

router.route("/EditaBloque").get((request, response) => {
  DBOperations.EditaBloque().then((result) => {
    response.json(result[0]);
  });
});

router.route("/GetIDTipoVehiculo/:id").get((request, response) => {
  DBOperations.GetIDTipoVehiculo(request.params.id).then((result) => {
    response.json(result[0]);
  });
});

router.route("/GetNombreDesigner/:id").get((request, response) => {
  DBOperations.GetNombreDesigner(request.params.id).then((result) => {
    response.json(result[0]);
  });
});

router.route("/GetIDDesigner/:id").get((request, response) => {
  DBOperations.GetIDDesigner(request.params.id).then((result) => {
    response.json(result[0]);
  });
});

router.route("/InsertarDesign").post((request, response) => {
  let datos = { ...request.body };
  DBOperations.InsertarDesign(datos).then((result) => {
    response.status(201).json(result);
  });
});

router.route("/ModificarDesign").post((request, response) => {
  let datos = { ...request.body };
  DBOperations.ModificarDesign(datos).then((result) => {
    response.status(201).json(result);
  });
});

router.route("/EliminarDesign/:id").get((request, response) => {
  DBOperations.EliminarDesign(request.params.id).then((result) => {
    response.json(result[0]);
  });
});

router.route("/CrearPlanta").post((request, response) => {
  let datos = { ...request.body };
  DBOperations.CrearPlanta(datos).then((result) => {
    response.status(201).json(result);
  });
});

router.route("/ModificarPlanta").post((request, response) => {
  let datos = { ...request.body };
  DBOperations.ModificarPlanta(datos).then((result) => {
    response.status(201).json(result);
  });
});

router.route("/EliminarPlanta/:id").get((request, response) => {
  DBOperations.EliminarPlanta(request.params.id).then((result) => {
    response.json(result[0]);
  });
});

router.route("/EliminarBloque/:id").get((request, response) => {
  DBOperations.EliminarBloque(request.params.id).then((result) => {
    response.json(result[0]);
  });
});

router.route("/EliminarVehiculo/:id").get((request, response) => {
  DBOperations.EliminarBloque(request.params.id).then((result) => {
    response.json(result[0]);
  });
});

router.route("/GetIDPlanta/:id").get((request, response) => {
  DBOperations.GetIDPlanta(request.params.id).then((result) => {
    response.json(result[0]);
  });
});

router.route("/GetIDBloque/:id").get((request, response) => {
  DBOperations.GetIDPlanta(request.params.id).then((result) => {
    response.json(result[0]);
  });
});

router.route("/GetPlantas").get((request, response) => {
  DBOperations.GetPlantas().then((result) => {
    response.json(result[0]);
  });
});

router.route("/GetVehiculos").get((request, response) => {
  DBOperations.GetVehiculos().then((result) => {
    response.json(result[0]);
  });
});

router.route("/GetDesignsData").get((request, response) => {
  DBOperations.GetDesignsData().then((result) => {
    response.json(result[0]);
  });
});

router.route("/GetPlanta/:id").get((request, response) => {
  DBOperations.GetPlanta(request.params.id).then((result) => {
    response.json(result[0]);
  });
});

router.route("/GetTipoVehiculos").get((request, response) => {
  DBOperations.GetTipoVehiculos().then((result) => {
    response.json(result[0]);
  });
});

router.route("/GetDesignsName").get((request, response) => {
  DBOperations.GetDesignsName().then((result) => {
    response.json(result[0]);
  });
});

router.route("/GetOwnerName").get((request, response) => {
  DBOperations.GetOwnerName().then((result) => {
    response.json(result[0]);
  });
});

router.route("/GetTipoVehiculoName/:id").get((request, response) => {
  DBOperations.GetTipoVehiculoName(request.params.id).then((result) => {
    response.json(result[0]);
  });
});

router.route("/GetCedOwner/:id").get((request, response) => {
  DBOperations.GetCedOwner(request.params.id).then((result) => {
    response.json(result[0]);
  });
});

router.route("/GetIDTipoVehiculos/:id").get((request, response) => {
  DBOperations.GetIDTipoVehiculos(request.params.id).then((result) => {
    response.json(result[0]);
  });
});

router.route("/GetDesigns/:id").get((request, response) => {
  DBOperations.GetDesigns(request.params.id).then((result) => {
    response.json(result[0]);
  });
});

router.route("/GetIDDesign/:id").get((request, response) => {
  DBOperations.GetIDDesign(request.params.id).then((result) => {
    response.json(result[0]);
  });
});

router.route("/GetBloquePlantaVehiculo/:idP/:idV").get((request, response) => {
  DBOperations.GetBloquePlantaVehiculo(request.params.idP,request.params.idV).then((result) => {
    response.json(result[0]);
  });
});

router.route("/GetBloqueInfo/:idP/:idV").get((request, response) => {
  console.log("MMMMMM")
  DBOperations.GetBloqueInfo(request.params.idP,request.params.idV).then((result) => {
    response.status(201).json(result);
  });
});

router.route("/CrearVehiculo").post((request, response) => {
  let datos = { ...request.body };
  DBOperations.CrearVehiculo(datos).then((result) => {
    response.status(201).json(result);
  });
});

router.route("/CrearBloque").post((request, response) => {
  let datos = { ...request.body };
  DBOperations.CrearBloque(datos).then((result) => {
    response.status(201).json(result);
  });
});

router.route("/CrearDesigner").post((request, response) => {
  let datos = { ...request.body };
  DBOperations.CrearDesigner(datos).then((result) => {
    response.status(201).json(result);
  });
});

router.route("/GetDesigners").get((request, response) => {
  DBOperations.GetDesigners().then((result) => {
    response.json(result[0]);
  });
});

router.route("/EliminarDesigner/:nombre").get((request, response) => {
  DBOperations.EliminarDesigner(request.params.nombre).then((result) => {
    response.json(result[0]);
  });
});

router.route("/ModificarDesigner").post((request, response) => {
  let datos = { ...request.body };
  DBOperations.ModificarDesigner(datos).then((result) => {
    response.status(201).json(result);
  });
});

var port = process.env.PORT || 8090;
app.listen(port);
console.log("The API is running at" + port);
