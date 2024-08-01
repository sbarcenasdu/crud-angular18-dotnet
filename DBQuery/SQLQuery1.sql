use DBCrudAngular

create table Empleado(
IDEmpleado int primary key identity,
NombreCompleto varchar(50),
Correo varchar(50),
Sueldo decimal(10,2),
FechaContrato date
)
go
insert into Empleado values(
'Maria Mendez', 'maria@gmail.com', 4500, '2024-01-12'
)

select * from Empleado
go

create proc sp_listaEmpleados as
begin
  select
  IDEmpleado,
  NombreCompleto,
  Correo,
  Sueldo,
  CONVERT(char(10),FechaContrato,103)[FechaContrato]
  from  Empleado
end
go

create proc sp_obtenerEmpleado(@IDEmpleado int) as
begin
  select
  IDEmpleado,
  NombreCompleto,
  Correo,
  Sueldo,
  CONVERT(char(10),FechaContrato,103)[FechaContrato]
  from  Empleado where IDEmpleado = @IDEmpleado
end
go

create proc sp_crearEmpleado(
@NombreCompleto varchar(50),
@Correo varchar(50),
@Sueldo decimal(10,2),
@FechaContrato varchar(10)
) as
begin
  set dateformat dmy
  insert into Empleado(
  NombreCompleto,
  Correo,
  Sueldo,
  FechaContrato)
  values(
  @NombreCompleto,
  @Correo,
  @Sueldo,
  CONVERT(date, @FechaContrato))
end
go

create proc sp_editarEmpleado(
@IDEmpleado int,
@NombreCompleto varchar(50),
@Correo varchar(50),
@Sueldo decimal(10,2),
@FechaContrato varchar(10)
) as
begin
  set dateformat dmy
  update Empleado
  set
  NombreCompleto = @NombreCompleto,
  Correo = @Correo,
  Sueldo = @Sueldo,
  FechaContrato = CONVERT(date, @FechaContrato)
  where IDEmpleado = @IDEmpleado
end
go

create proc sp_eliminarEmpleado(@IDEmpleado int) as
begin
  delete from Empleado
  where IDEmpleado = @IDEmpleado
end
