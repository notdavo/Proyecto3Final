CREATE DATABASE EnsamblajeBD;
GO

--USE EnsamblajeBD;
--GO

--- TABLA PLANTA
create table Planta (
	id INT IDENTITY (1,1),
	nombre varchar (50) NOT NULL,
	provincia varchar (50) NOT NULL,
	canton varchar (50) NOT NULL,
	distrito varchar (50) NOT NULL,
	direccion_exacta varchar (50) NOT NULL,
	telefono varchar (50) NOT NULL,
	PRIMARY KEY (id)
);
go

--- TABLA TIPOVEHICULO
create table TipoVehiculo (
	id INT PRIMARY KEY IDENTITY (1,1),
	nombreTipo varchar (20) NOT NULL
);
go

--- TABLA BLOQUE
create table Bloque (
	id INT PRIMARY KEY IDENTITY (1,1),
	idTipoVehiculo INT NOT NULL,
	idPlanta INT NOT NULL,
	espacioDisponible INT NOT NULL,
	FOREIGN KEY (idPlanta) REFERENCES Planta(id),
	FOREIGN KEY (idTipoVehiculo) REFERENCES TipoVehiculo(id)
);
go

--- TABLA VOWNER
create table VOwner (
	cedula varchar (10) NOT NULL,
	nombre varchar (50) NOT NULL,
	apellido1 varchar (50) NOT NULL,
	apellido2 varchar (50) NOT NULL,
	PRIMARY KEY (cedula)
);
go

--- TABLA DESIGNER
create table Designer (
	id INT IDENTITY (1,1),
	idTipoVehiculo INT NOT NULL,
	nombre varchar (50) NOT NULL,
	apellido1 varchar (50) NOT NULL,
	apellido2 varchar (50) NOT NULL,
	yearsExp varchar (10) NOT NULL,
	nivel varchar (10) NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (idTipoVehiculo) REFERENCES TipoVehiculo(id)
);
go

--- TABLA VDESIGN
create table VDesign (
	id INT IDENTITY (1,1),
	idTipoV INT NOT NULL,
	trasmision varchar (50) NOT NULL,
	material_asientos varchar (50) NOT NULL,
	motor varchar (50) NOT NULL,
	vidrios_electricos bit NOT NULL,
	espejos_electricos bit NOT NULL,
	sensoresProx_traseros bit NOT NULL,
	sensoresProx_delanteros bit NOT NULL,
	nombredesign varchar (50) NOT NULL,
	idDesigner INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (idTipoV) REFERENCES TipoVehiculo(id),
	FOREIGN KEY (idDesigner) REFERENCES Designer(id)
);
go

--- TABLA VEHICULO
create table Vehiculo (
	id INT IDENTITY (1,1),
	placa varchar (50) NOT NULL,
	idTipoVehiculo INT NOT NULL,
	idBloque INT NOT NULL,
	cedulaOwner varchar (10) NOT NULL,
	idDesign INT NOT NULL,
	PRIMARY KEY (id),
    FOREIGN KEY (idTipoVehiculo) REFERENCES TipoVehiculo(id),
	FOREIGN KEY (idBloque) REFERENCES Bloque(id),
	FOREIGN KEY (cedulaOwner) REFERENCES VOwner(cedula),
	FOREIGN KEY (idDesign) REFERENCES VDesign(id)
);
go

-------------------------------------------------------
-------------------------------------------------------
-------------------------------------------------------

insert into TipoVehiculo (nombreTipo) values ('Sedán');
go
insert into TipoVehiculo (nombreTipo) values ('Sedán de Lujo');
go
insert into TipoVehiculo (nombreTipo) values ('Camioneta');
go


insert into VOwner (cedula, nombre, apellido1, apellido2) values ('207770777', 'Manuel', 'Perez', 'Araya');
go
insert into VOwner (cedula, nombre, apellido1, apellido2) values ('2011103333', 'Ana', 'Arce', 'Piedra');
go

-------------------------------------------------------
-------------------------------------------------------
-------------------------------------------------------

-- Resta espacio en bloque
CREATE PROCEDURE EditaBloque
as
begin
	update Bloque set espacioDisponible = (espacioDisponible - 1) where id in (select idBloque from Vehiculo)
end;
go


-- Obtiene todos los tipos de vehiuclo
CREATE PROCEDURE GetTipoVehiculo
as
begin
	select nombreTipo from TipoVehiculo
end;
go

-- OBTIENE EL NOMBRE DEL TIPO DE VEHICULO POR ID
CREATE PROCEDURE GetTipoVehiculoName
@id int
as
begin
	select nombreTipo from TipoVehiculo where id = @id
end;
go

-- Obtiene idTipoVehiculo
CREATE PROCEDURE GetIDTipoVehiculo
@nombreTipo varchar (20)
as
begin
	select id from TipoVehiculo where nombreTipo = @nombreTipo
end;
go

-- Obtener nombre diseñador
CREATE PROCEDURE GetNombreDesigner
@idTipoVehiculo int
as
begin
	select nombre from Designer where idTipoVehiculo = @idTipoVehiculo
end;
go

-- Obtener id del disenador seleccionado
CREATE PROCEDURE GetIDDesigner
@nombre varchar (20)
as
begin
	select id from Designer where nombre = @nombre
end;
go

-- Crea nuevo diseño
CREATE PROCEDURE InsertarDesign
@idTipoV INT, 
@trasmision varchar (50),
@material_asientos varchar (50),
@motor varchar (50),
@vidrios_electricos int,
@espejos_electricos int,
@sensoresProx_traseros int,
@sensoresProx_delanteros int,
@nombredesign varchar (50),
@idDesigner INT
as
begin
	insert into VDesign (idTipoV, trasmision, material_asientos, motor, vidrios_electricos, espejos_electricos,
						 sensoresProx_traseros, sensoresProx_delanteros, nombredesign, idDesigner) 
	values (@idTipoV, @trasmision, @material_asientos, @motor, @vidrios_electricos, @espejos_electricos,
			@sensoresProx_traseros, @sensoresProx_delanteros, @nombredesign, @idDesigner)
end;
go

-- Modificar diseño
CREATE PROCEDURE ModificarDesign
@id INT,
@idTipoV INT, 
@trasmision varchar (50),
@material_asientos varchar (50),
@motor varchar (50),
@vidrios_electricos bit,
@espejos_electricos bit,
@sensoresProx_traseros bit,
@sensoresProx_delanteros bit,
@nombredesign varchar (50),
@idDesigner INT
as
begin
	update VDesign set idTipoV =@idTipoV, trasmision=@trasmision, material_asientos=@material_asientos, motor=@motor,
					   vidrios_electricos=@vidrios_electricos, espejos_electricos=@espejos_electricos,
					   sensoresProx_traseros=@sensoresProx_traseros, sensoresProx_delanteros=@sensoresProx_delanteros,
					   nombredesign=@nombredesign, idDesigner=@idDesigner 
	where id = @id
end;
go

-- Eliminar diseño
CREATE PROCEDURE EliminarDesign
@id INT
as
begin
	delete from VDesign where id = @id
end;
go

-- Crea planta
create procedure CrearPlanta
@nombre varchar (50),
@provincia varchar (50),
@canton varchar (50),
@distrito varchar (50),
@direccion_exacta varchar (50),
@telefono varchar (50)
as
begin
	insert into Planta (nombre, provincia, canton, distrito, direccion_exacta, telefono) 
		   values (@nombre, @provincia, @canton, @distrito, @direccion_exacta, @telefono);
end;
go


-- Modificar planta
create procedure ModificarPlanta
@id INT,
@nombre varchar (50),
@provincia varchar (50),
@canton varchar (50),
@distrito varchar (50),
@direccion_exacta varchar (50),
@telefono varchar (50)
as
begin
	update Planta set nombre=@nombre, provincia=@provincia, canton=@canton, distrito=@distrito,
					  direccion_exacta=@direccion_exacta, telefono=@telefono
	where id = @id
end;
go

-- Eliminar planta
create procedure EliminarPlanta
@id INT
as
begin
	delete from Planta where id = @id
end;
go

-- ELIMINA BLOQUE
create procedure EliminarBloque
@id INT
as
begin
	delete from Bloque where idPlanta = @id
end;
go

-- ELIMINA VEHICULO
create procedure EliminarVehiculo
@id INT
as
begin
	delete from Vehiculo where idBloque = @id
end;
go

-- Obtener nombre planta
create procedure GetNombresPlanta
as
begin
	select nombre from Planta
end;
go

-- Obtener id Planta seleccionada
create procedure GetIDPlanta
@nombre varchar(50)
as
begin
	select id from Planta where nombre = @nombre
end;
go

-- OBTIENE IDBLOQUE
create procedure GetIDBloque
@id int
as
begin
	select id from Bloque where idPlanta = @id
end;
go

-- Obtiene todos los tipos de vehiuclo
create procedure GetTipoVehiculos
as
begin
	select nombreTipo from TipoVehiculo;
end;
go

-- OBTIENE DATA DE DESIGN
create procedure GetDesignsData
as
begin
	select * from VDesign;
end;
go

-- Obtiene idTipoVehiculo
create procedure GetIDTipoVehiculos
@nombre varchar(50)
as
begin
	select id from TipoVehiculo where nombreTipo = @nombre;
end;
go	

-- Obtener lista diseños
create procedure GetDesigns
@id int
as
begin
	select nombreDesign from VDesign where idTipoV = @id;
end;
go	

-- OBTIENE LOS NOMBRES DE LOS DESIGNS
create procedure GetDesignsName
as
begin
	select nombreDesign from VDesign;
end;
go

-- Obtener id diseno por nombre
create procedure GetIDDesign
@nombreDesign varchar(50)
as
begin
	select id from VDesign where nombreDesign = @nombreDesign;
end;
go

-- Ver bloques
create procedure GetBloqueInfo
@idPlanta int,
@idTipoVehiculo int
as
begin
	select * from Bloque where idPlanta = @idPlanta and idTipoVehiculo = @idTipoVehiculo;
end;
go

-- Inserta el Vehiculo 
create procedure CrearVehiculo
@placa varchar (50),
@idTipoVehiculo INT,
@idBloque INT,
@cedulaOwner varchar (10),
@idDesign INT 
as
begin
	insert into Vehiculo (placa, idTipoVehiculo, idBloque, cedulaOwner, idDesign) 
		   values (@placa, @idTipoVehiculo, @idBloque, @cedulaOwner, @idDesign);
end;
go

-- Insertar disenador
create procedure CrearDesigner
@idTipoVehiculo INT,
@nombre varchar (50),
@apellido1 varchar (50),
@apellido2 varchar (50),
@yearsExp varchar (10),
@nivel varchar (10)
as
begin
	insert into Designer (idTipoVehiculo, nombre, apellido1, apellido2, yearsExp, nivel) 
		   values (@idTipoVehiculo, @nombre, @apellido1, @apellido2, @yearsExp, @nivel);
end;
go

-- OBTIENE LOS DATOS DE LAS PLANTAS
create procedure GetPlantas
as
begin
	select id, nombre, provincia, canton, distrito, direccion_exacta, telefono, (select espacioDisponible from Bloque b where p.id = idPlanta and idTipoVehiculo = 1) as bloqueA,
	       (select espacioDisponible from Bloque b where p.id = idPlanta and idTipoVehiculo = 2) as bloqueB, 
		   (select espacioDisponible from Bloque b where p.id = idPlanta and idTipoVehiculo = 3) as bloqueC from Planta p
end;
go

-- OBTIENE LOS DATOS DE UNA PLANTA POR ID
create procedure GetPlanta
@id int
as
begin
	select * from Planta where id = @id
end;
go

-- OBTIENE LOS DESIGNS
create procedure GetVDesigns
as
begin
	select * from VDesign
end;
go

--  CREA NUEVO BLOQUE
create procedure CrearBloque
@idVehiculo int,
@idPlanta int,
@espacios int
as
begin
	insert into Bloque (idTipoVehiculo, idPlanta, espacioDisponible)
			    values (@idVehiculo, @idPlanta, @espacios)
end;
go

-- OBTIENE EL NOMBRE DEL OWNER
create procedure GetOwnerName
as
begin
	select nombre from VOwner
end;
go

-- OBTIENE LA CEDURA DEL OWNER
create procedure GetCedOwner
@nombre int
as
begin
	select cedula from VOwner where nombre = @nombre;
end;
go

-- OBTIENE EL ID DEL BLOQUE DE CARRO ESPECIFICO
create procedure GetBloquePlantaVehiculo
@idPlanta int,
@idTipovehiculo int
as
begin
	select id from Bloque where idPlanta = @idPlanta and idTipoVehiculo = @idTipovehiculo;
end;
go

-- OBTIENE DATA DE VEHICULOS
create procedure GetVehiculos
as
begin
	select * from Vehiculo
end;
go

-- OBTIENE DESIGNERS
create proc GetDesigners
AS
Begin
	select t.nombreTipo, nombre, apellido1, apellido2, yearsExp, nivel from Designer
	inner join TipoVehiculo t on t.id=idTipoVehiculo
END;
GO

-- MODIFICA DESIGNERS
create proc ModificarDesigner
@nombre varchar(50),
@nombreMod varchar(50),
@apellido1 varchar(50),
@apellido2 varchar(50),
@yearsExp varchar(10),
@nivel varchar(10),
@idTipoVehiculo int
AS
BEGIN
	update Designer
	set nombre=@nombreMod, apellido1=@apellido1, apellido2=@apellido2, yearsExp=@yearsExp, nivel=@nivel, idTipoVehiculo=@idTipoVehiculo
	where (nombre+' '+apellido1+' '+apellido2)= @nombre
END
GO

-- ELIMINA DESIGNERS
create proc EliminarDesigner
@nombre varchar(150)
AS
BEGIN
	delete from Designer
	where (nombre+apellido1+apellido2) = @nombre
END
GO
