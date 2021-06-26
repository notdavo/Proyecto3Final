var config = require("./DBConfig");
const sql = require("mssql");


async function GetNombresPlanta() {
  try {
    let pool = await sql.connect(config);
    let categories = await pool.request().execute("GetNombresPlanta");
    return categories.recordsets;
  } catch (err) {
    console.log(err);
  }
}


async function GetVDesigns() {
  try {
    let pool = await sql.connect(config);
    let categories = await pool.request().execute("GetVDesigns");
    return categories.recordsets;
  } catch (err) {
    console.log(err);
  }
}

async function EditaBloque() {
  try {
    let pool = await sql.connect(config);
    let categories = await pool.request().execute("EditaBloque");
    return categories.recordsets;
  } catch (err) {
    console.log(err);
  }
}

async function GetIDTipoVehiculo(nombreTipo) {
  try {
    let pool = await sql.connect(config);
    let supplier = await pool
      .request()
      .input("nombreTipo", sql.NVarChar, nombreTipo)
      .execute("GetIDTipoVehiculo");
    return supplier.recordsets;
  } catch (err) {
    console.log(err);
  }
}

async function GetNombreDesigner(idTipoVehiculo) {
  try {
    let pool = await sql.connect(config);
    let supplier = await pool
      .request()
      .input("idTipoVehiculo", sql.Int, idTipoVehiculo)
      .execute("GetNombreDesigner");
    return supplier.recordsets;
  } catch (err) {
    console.log(err);
  }
}

async function GetIDDesigner(nombre) {
  try {
    let pool = await sql.connect(config);
    let supplier = await pool
      .request()
      .input("nombre", sql.NVarChar, nombre)
      .execute("GetIDDesigner");
    return supplier.recordsets;
  } catch (err) {
    console.log(err);
  }
}

async function InsertarDesign(datos) {
  try {
    let pool = await sql.connect(config);
    let InsertarDesign = await pool
      .request() 
      .input("idTipoV", sql.Int, datos.idTipoV)
      .input("trasmision", sql.NVarChar, datos.trasmision)
      .input("material_asientos", sql.NVarChar, datos.material_asientos)
      .input("motor", sql.NVarChar, datos.motor)
      .input("vidrios_electricos", sql.Int, datos.vidrios_electricos)
      .input("espejos_electricos", sql.Int, datos.espejos_electricos)
      .input("sensoresProx_traseros", sql.Int, datos.sensoresProx_traseros)
      .input("sensoresProx_delanteros", sql.Int, datos.sensoresProx_delanteros)
      .input("nombredesign", sql.NVarChar, datos.nombredesign)
      .input("idDesigner", sql.Int, datos.idDesigner)
      .execute("InsertarDesign");
    return InsertarDesign.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function ModificarDesign(datos) {
  try {
    let pool = await sql.connect(config);
    let ModificarDesign = await pool
      .request() 
      .input("id", sql.Int, datos.id)
      .input("idTipoV", sql.Int, datos.idTipoV)
      .input("trasmision", sql.NVarChar, datos.trasmision)
      .input("material_asientos", sql.NVarChar, datos.material_asientos)
      .input("motor", sql.NVarChar, datos.motor)
      .input("vidrios_electricos", sql.Bit, datos.vidrios_electricos)
      .input("espejos_electricos", sql.Bit, datos.espejos_electricos)
      .input("sensoresProx_traseros", sql.Bit, datos.sensoresProx_traseros)
      .input("sensoresProx_delanteros", sql.Bit, datos.sensoresProx_delanteros)
      .input("nombredesign", sql.NVarChar, datos.nombredesign)
      .input("idDesigner", sql.Int, datos.idDesigner)
      .execute("ModificarDesign");
    return ModificarDesign.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function EliminarDesign(id) {
  try {
    let pool = await sql.connect(config);
    let supplier = await pool
      .request()
      .input("id", sql.Int, id)
      .execute("EliminarDesign");
    return supplier.recordsets;
  } catch (err) {
    console.log(err);
  }
}

async function GetBloquePlantaVehiculo(idP,idV) {
  try {
    let pool = await sql.connect(config);
    let supplier = await pool
      .request()
      .input("idPlanta", sql.Int, idP)
      .input("idTipovehiculo", sql.Int, idV)
      .execute("GetBloquePlantaVehiculo");
    return supplier.recordsets;
  } catch (err) {
    console.log(err);
  }
}

async function GetTipoVehiculoName(id) {
  try {
    let pool = await sql.connect(config);
    let supplier = await pool
      .request()
      .input("id", sql.Int, id)
      .execute("GetTipoVehiculoName");
    return supplier.recordsets;
  } catch (err) {
    console.log(err);
  }
}

async function CrearPlanta(datos) {
  try {
    let pool = await sql.connect(config);
    let CrearPlanta = await pool
      .request() 
      .input("nombre", sql.NVarChar, datos.nombre)
      .input("provincia", sql.NVarChar, datos.provincia)
      .input("canton", sql.NVarChar, datos.canton)
      .input("distrito", sql.NVarChar, datos.distrito)
      .input("direccion_exacta", sql.NVarChar, datos.direccion_exacta)
      .input("telefono", sql.NVarChar, datos.telefono)
      .execute("CrearPlanta");
    return CrearPlanta.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function ModificarPlanta(datos) {
  try {
    let pool = await sql.connect(config);
    let ModificarPlanta = await pool
      .request() 
      .input("id", sql.Int, datos.id)
      .input("nombre", sql.NVarChar, datos.nombre)
      .input("provincia", sql.NVarChar, datos.provincia)
      .input("canton", sql.NVarChar, datos.canton)
      .input("distrito", sql.NVarChar, datos.distrito)
      .input("direccion_exacta", sql.NVarChar, datos.direccion_exacta)
      .input("telefono", sql.NVarChar, datos.telefono)
      .execute("ModificarPlanta");
    return ModificarPlanta.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function GetPlanta(id) {
  try {
    let pool = await sql.connect(config);
    let supplier = await pool.request().input("id", sql.Int, id).execute("GetPlanta");
    return supplier.recordsets;
  } catch (err) {
    console.log(err);
  }
}

async function EliminarBloque(id) {
  try {
    let pool = await sql.connect(config);
    let supplier = await pool.request().input("id", sql.Int, id).execute("EliminarBloque");
    return supplier.recordsets;
  } catch (err) {
    console.log(err);
  }
}

async function EliminarPlanta(id) {
  try {
    let pool = await sql.connect(config);
    let supplier = await pool.request().input("id", sql.Int, id).execute("EliminarPlanta");
    return supplier.recordsets;
  } catch (err) {
    console.log(err);
  }
}

async function EliminarVehiculo(id) {
  try {
    let pool = await sql.connect(config);
    let supplier = await pool.request().input("id", sql.Int, id).execute("EliminarVehiculo");
    return supplier.recordsets;
  } catch (err) {
    console.log(err);
  }
}

async function GetIDPlanta(nombre) {
  try {
    let pool = await sql.connect(config);
    let supplier = await pool
      .request()
      .input("nombre", sql.NVarChar, nombre)
      .execute("GetIDPlanta");
    return supplier.recordsets;
  } catch (err) {
    console.log(err);
  }
}

async function GetIDBloque(int) {
  try {
    let pool = await sql.connect(config);
    let supplier = await pool
      .request()
      .input("id", sql.Int, int)
      .execute("GetIDBloque");
    return supplier.recordsets;
  } catch (err) {
    console.log(err);
  }
}

async function GetPlantas() {
  try {
    let pool = await sql.connect(config);
    let categories = await pool.request().execute("GetPlantas");
    return categories.recordsets;
  } catch (err) {
    console.log(err);
  }
}

async function GetOwnerName() {
  try {
    let pool = await sql.connect(config);
    let categories = await pool.request().execute("GetOwnerName");
    return categories.recordsets;
  } catch (err) {
    console.log(err);
  }
}

async function GetTipoVehiculos() {
  try {
    let pool = await sql.connect(config);
    let categories = await pool.request().execute("GetTipoVehiculos");
    return categories.recordsets;
  } catch (err) {
    console.log(err);
  }
}

async function GetDesignsData() {
  try {
    let pool = await sql.connect(config);
    let categories = await pool.request().execute("GetDesignsData");
    return categories.recordsets;
  } catch (err) {
    console.log(err);
  }
}

async function GetDesignsName() {
  try {
    let pool = await sql.connect(config);
    let categories = await pool.request().execute("GetDesignsName");
    return categories.recordsets;
  } catch (err) {
    console.log(err);
  }
}

async function GetVehiculos() {
  try {
    let pool = await sql.connect(config);
    let categories = await pool.request().execute("GetVehiculos");
    return categories.recordsets;
  } catch (err) {
    console.log(err);
  }
}

async function GetIDTipoVehiculos(nombre) {
  try {
    let pool = await sql.connect(config);
    let supplier = await pool
      .request()
      .input("nombre", sql.NVarChar, nombre)
      .execute("GetIDTipoVehiculos");
    return supplier.recordsets;
  } catch (err) {
    console.log(err);
  }
}

async function GetDesigns(id) {
  try {
    let pool = await sql.connect(config);
    let supplier = await pool
      .request()
      .input("id", sql.NVarChar, id)
      .execute("GetDesigns");
    return supplier.recordsets;
  } catch (err) {
    console.log(err);
  }
}

async function GetIDDesign(nombre) {
  try {
    let pool = await sql.connect(config);
    let supplier = await pool
      .request()
      .input("nombreDesign", sql.NVarChar, nombre)
      .execute("GetIDDesign");
    return supplier.recordsets;
  } catch (err) {
    console.log(err);
  }
}

async function GetCedOwner(nombre) {
  console.log (nombre, " adsfasfd");
  try {
    let pool = await sql.connect(config);
    let supplier = await pool
      .request()
      .input("nombre", sql.NVarChar, nombre)
      .execute("GetCedOwner");
    return supplier.recordsets;
  } catch (err) {
    console.log(err);
  }
}

async function GetBloqueInfo(idP,idV) {
  console.log("ASDSDSD")
  try {
    let pool = await sql.connect(config);
    let GetBloqueInfo = await pool
      .request() 
      .input("idPlanta", sql.Int, idP)
      .input("idTipoVehiculo", sql.Int, idV)
      .execute("GetBloqueInfo");
    return GetBloqueInfo.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function CrearVehiculo(datos) {
  try {
    let pool = await sql.connect(config);
    let CrearVehiculo = await pool
      .request() 
      .input("placa", sql.NVarChar, datos.placa)
      .input("idTipoVehiculo", sql.Int, datos.idTipoVehiculo)
      .input("idBloque", sql.Int, datos.idBloque)
      .input("cedulaOwner", sql.NVarChar, datos.cedulaOwner)
      .input("idDesign", sql.Int, datos.idDesign)
      .execute("CrearVehiculo");
    return CrearVehiculo.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function CrearDesigner(datos) {
  try {
    let pool = await sql.connect(config);
    let CrearDesigner = await pool
      .request()
      .input("idTipoVehiculo", sql.Int, datos.idTipoVehiculo)
      .input("nombre", sql.NVarChar, datos.nombre)
      .input("apellido1", sql.NVarChar, datos.apellido1)
      .input("apellido2", sql.NVarChar, datos.apellido2)
      .input("yearsExp", sql.NVarChar, datos.yearsExp)
      .input("nivel", sql.NVarChar, datos.nivel)
      .execute("CrearDesigner");
    return CrearDesigner.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function CrearBloque(datos) {
  try {
    let pool = await sql.connect(config);
    let CrearBloque = await pool
      .request()
      .input("idVehiculo", sql.Int, datos.idTipoVehiculo)
      .input("idPlanta", sql.Int, datos.idPlanta)
      .input("espacios", sql.Int, datos.espacioDisponible)
      .execute("CrearBloque");
    return CrearBloque.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function GetDesigners() {
  try {
    let pool = await sql.connect(config);
    let categories = await pool.request().execute("GetDesigners");
    return categories.recordsets;
  } catch (err) {
    console.log(err);
  }
}

async function ModificarDesigner(datos) {
  try {
    let pool = await sql.connect(config);
    let ModificarDesign = await pool
      .request()
      .input("idTipoVehiculo", sql.Int, datos.idTipoVehiculo)
      .input("nombreMod", sql.NVarChar, datos.nombreMod)
      .input("nombre", sql.NVarChar, datos.nombre)
      .input("apellido1", sql.NVarChar, datos.apellido1)
      .input("apellido2", sql.NVarChar, datos.apellido2)
      .input("yearsExp", sql.NVarChar, datos.yearsExp)
      .input("nivel", sql.NVarChar, datos.nivel)
      .execute("ModificarDesigner");
    return ModificarDesign.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function EliminarDesigner(nombre) {
  try {
    let pool = await sql.connect(config);
    let supplier = await pool
      .request()
      .input("nombre", sql.NVarChar, nombre)
      .execute("EliminarDesigner");
    return supplier.recordsets;
  } catch (err) {
    console.log(err);
  }
}



module.exports = {
  GetNombresPlanta : GetNombresPlanta,
  GetPlantas : GetPlantas,
  EditaBloque : EditaBloque,
  GetIDTipoVehiculo : GetIDTipoVehiculo,
  GetNombreDesigner : GetNombreDesigner,
  GetIDDesigner : GetIDDesigner,
  InsertarDesign : InsertarDesign,
  ModificarDesign : ModificarDesign,
  EliminarDesign : EliminarDesign,
  CrearPlanta : CrearPlanta,
  ModificarPlanta : ModificarPlanta,
  EliminarPlanta : EliminarPlanta,
  GetIDPlanta : GetIDPlanta,
  GetTipoVehiculos : GetTipoVehiculos,
  GetIDTipoVehiculos : GetIDTipoVehiculos,
  GetDesigns : GetDesigns,
  GetIDDesign : GetIDDesign,
  GetBloqueInfo : GetBloqueInfo,
  CrearVehiculo : CrearVehiculo,
  CrearDesigner : CrearDesigner,
  CrearBloque: CrearBloque,
  GetVDesigns : GetVDesigns,
  GetPlanta : GetPlanta,
  EliminarBloque: EliminarBloque,
  EliminarVehiculo: EliminarVehiculo,
  GetIDBloque: GetIDBloque,
  GetDesignsData: GetDesignsData,
  GetTipoVehiculoName: GetTipoVehiculoName,
  GetDesignsName: GetDesignsName,
  GetOwnerName: GetOwnerName,
  GetCedOwner: GetCedOwner,
  GetBloquePlantaVehiculo: GetBloquePlantaVehiculo,
  GetVehiculos: GetVehiculos,
  GetDesigners: GetDesigners,
  ModificarDesigner: ModificarDesigner,
  EliminarDesigner: EliminarDesigner,
};
