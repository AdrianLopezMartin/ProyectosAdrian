// @ts-nocheck
// Code added here will be run once
// whenever the node is started.

/////////////////////Definición de variables/////////////////////////////////

var tiempo = msg.payload;
var marcaDeTiempo = new Date(msg.payload);
var numero = marcaDeTiempo.getDate();
var mes = marcaDeTiempo.getMonth();
var dia = marcaDeTiempo.getDay();
var meses=[];
var tareasSemanales = [];
var tareasMensuales = [];
var tareasQuincenales = [];
var tareasBimensuales=[];
var tareasAnuales=[];
var todasTareasQuincenales = [];
var todasTareasMensuales = [];
var todasTareasAnuales = [];
var todasTareasBimensuales=[];
var todasTareasSemestrales=[];
var tareasSemestrales=[];
// Asigno el mes y dia de la semana en formato String
mes=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'][mes];
dia=['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'][dia];

// Creamos un calendario con los dias de cada mes
meses={'Enero':31,'Febrero':29,'Marzo':31,'Abril':30,'Mayo':31,'Junio':30,'Julio':31,'Agosto':31,'Septiembre':30,'Octubre':31,'Noviembre':30,'Diciembre':31}

//Guardo todas nuestras tareas Semanales,Quincenales,Mensuales,Bimensuales y Anuales

tareasSemanales= ['Ordenar Casa (Modo Elsa)','Limpiar Baño Arriba','Limpiar Baño Abajo','Barrer Porche','Limpiar Comedero y Bebedero','Colada (Común)','Mudar Cama (Común)'];
todasTareasQuincenales = ['Poner Conga arriba','Nevera'];
todasTareasMensuales=['Limpiar Microondas','Limpiar Horno','FregarSuelos(Comun)','Limpiar escalera (Comun)','Bañar a Chucho'];
todasTareasBimensuales = ['Limpiar Cristales', 'Limpiar Coche'];
todasTareasSemestrales = ['Ordenar Armarios', 'Limpieza Cocina a Fondo', 'Despensa', 'Cortinas'];
todasTareasAnuales = ['Parrilla', 'Limpieza Paneles', 'Revision Congelador', 'Revision Medicamentos'];


//                  Asignacion de Semana

    if (numero>0 && numero<=7){var semana =1}
    else if (numero>7 && numero<=14){var semana = 2}
    else if (numero>14 && numero <=21){var semana = 3}
    else if (numero>21 && numero<=28){var semana = 4}
    else if (numero>28){var semana = 5}


// Declaracion de una variable global Para que cambie cada vez que se ejecute el programa

// La idea es que cada vez que se ejecute el programa la variable si estaba en true se ponga en false para que la siguiente semana no toque tarea quincenal

if (typeof(context.flow.variable)!=='boolean'){
    delete context.flow.variable
}
if (context.flow.variable === undefined) /*context.flow declara variable como global*/ {
    context.flow.variable = true;
}
else if (context.flow.variable==true){
context.flow.variable=false
}
else if (context.flow.variable==false){
context.flow.variable=true}

msg.variable = context.flow.variable;
msg.mes=mes;


///////////////////////////Asignación Tareas/////////////////////////

   // Asignacion Tareas Quincenales
// Comprobamos si tuvimos tareas la semana anterior.
if(context.flow.variable){
    tareasQuincenales=todasTareasQuincenales;

}

// Asignacion tareas por mes
// Enero 
if(mes === 'Enero'){
    if(semana == 1){
        tareasMensuales=['Lavar al Chucho'];
        tareasBimensuales=['Limpiar Coche'];
        tareasSemestrales=['Limpiar Suelos'];
        tareasAnuales=['Revisión Arcón'];
    }
    if(semana == 2){
        tareasMensuales=['Limpiar Suelos(Común)','Limpiar Escalera'];
        tareasBimensuales=[];
        tareasSemestrales=[];
        tareasAnuales=['Revisión Arcón'];
    }
    if(semana == 3){
        tareasMensuales=[];
        tareasBimensuales=['Limpiar Coche'];
        tareasSemestrales=['Ordenar Despensa','Ordenar Medicamentos'];
        tareasAnuales=[];
    }
    if(semana == 4){
        tareasMensuales=['Limpiar Horno'];
        tareasBimensuales=[];
        tareasSemestrales=[];
        tareasAnuales=[];
    }
}

// Febrero 
if (mes === 'Febrero') {
    if (semana == 1) { 
        tareasMensuales=['Bañar a Chucho'];
        tareasBimensuales = [];
        tareasSemestrales = [];
        tareasAnuales = [];
    }
    if (semana == 2) { 
        tareasMensuales=['FregarSuelos(Comun)','Limpiar escalera (Comun)'];
        tareasBimensuales = [];
        tareasSemestrales = [];
        tareasAnuales = [];
    }
    if (semana == 3) { 
        tareasMensuales=[];
        tareasBimensuales = [];
        tareasSemestrales = [ 'Limpieza Cocina a Fondo', ];
        tareasAnuales = [];
    }
    if (semana == 4) {
        tareasMensuales=['Limpiar Microondas','Limpiar Horno'];
        tareasBimensuales = ['Limpiar Cristales'];
        tareasSemestrales = [];
        tareasAnuales = [];
     }
}

// Marzo
if (mes === 'Marzo') {
    if (semana == 1) {
        tareasMensuales=['Bañar a Chucho'];
        tareasBimensuales = ['Limpiar Coche'];
        tareasSemestrales = [];
        tareasAnuales = [];
    }
    if (semana == 2) { 
        tareasMensuales=['FregarSuelos(Comun)','Limpiar escalera (Comun)'];
        tareasBimensuales = [];
        tareasSemestrales = [];
        tareasAnuales = [];
    }
    if (semana == 3) {
        tareasMensuales=[];
        tareasBimensuales = [];
        tareasSemestrales = ['Cortinas'];
        tareasAnuales = [];
     }
    if (semana == 4) { 
        tareasMensuales=['Limpiar Microondas','Limpiar Horno'];
        tareasBimensuales = [];
        tareasSemestrales = [];
        tareasAnuales = [];
    }
}
// Abril

if (mes === 'Abril') {
    if (semana == 1) {
        tareasMensuales = [ 'Bañar a Chucho'];
        tareasBimensuales = [];
        tareasSemestrales = [];
        tareasAnuales = [];
     }
    if (semana == 2) {
        tareasMensuales = ['FregarSuelos(Comun)', 'Limpiar escalera (Comun)'];
        tareasBimensuales = [];
        tareasSemestrales = [];
        tareasAnuales = [];
     }
    if (semana == 3) {
        tareasMensuales = [];
        tareasBimensuales = [];
        tareasSemestrales = [];
        tareasAnuales = ['Parrilla'];
     }
    if (semana == 4) {
        tareasMensuales = ['Limpiar Microondas', 'Limpiar Horno'];
        tareasBimensuales = ['Limpiar Cristales'];
        tareasSemestrales = [];
        tareasAnuales = [];
     }
}
// Mayo 
if (mes === 'Mayo') {
    if (semana == 1) { 
        tareasMensuales = ['Bañar a Chucho'];
        tareasBimensuales = ['Limpiar Coche'];
        tareasSemestrales = [];
        tareasAnuales = [];
    }
    if (semana == 2) { 
        tareasMensuales = ['FregarSuelos(Comun)', 'Limpiar escalera (Comun)'];
        tareasBimensuales = [];
        tareasSemestrales = [];
        tareasAnuales = [];
    }
    if (semana == 3) { 
        tareasMensuales = [];
        tareasBimensuales = [];
        tareasSemestrales = ['Ordenar Armarios'];
        tareasAnuales = [];
    }
    if (semana == 4) { 
        tareasMensuales = ['Limpiar Microondas', 'Limpiar Horno'];
        tareasBimensuales = [];
        tareasSemestrales = [];
        tareasAnuales = [];
    }
}

// Junio 
if (mes === 'Junio') {
    if (semana == 1) {
        tareasMensuales = ['Bañar a Chucho'];
        tareasBimensuales = [];
        tareasSemestrales = [];
        tareasAnuales = [];
}
    if (semana == 2) {
        tareasMensuales = ['FregarSuelos(Comun)', 'Limpiar escalera (Comun)'];
        tareasBimensuales = [];
        tareasSemestrales = [];
        tareasAnuales = []; }
    if (semana == 3) {
        tareasMensuales = [];
        tareasBimensuales = [];
        tareasSemestrales = [];
        tareasAnuales = ['Limpieza Paneles']; }
    if (semana == 4) {
        tareasMensuales = ['Limpiar Microondas', 'Limpiar Horno'];
        tareasBimensuales = ['Limpiar Cristales'];
        tareasSemestrales = [];
        tareasAnuales = [];
}
}

// Julio
if (mes === 'Julio') {
    if (semana == 1) {
        tareasMensuales = ['Bañar a Chucho'];
        tareasBimensuales = ['Limpiar Coche'];
        tareasSemestrales = [];
        tareasAnuales = [];
}
    if (semana == 2) {
        tareasMensuales = ['FregarSuelos(Comun)', 'Limpiar escalera (Comun)'];
        tareasBimensuales = [];
        tareasSemestrales = [];
        tareasAnuales = [];
}
    if (semana == 3) {
        tareasMensuales = [];
        tareasBimensuales = [];
        tareasSemestrales = [ 'Despensa'];
        tareasAnuales = [];
}
    if (semana == 4) {
        tareasMensuales = ['Limpiar Microondas', 'Limpiar Horno'];
        tareasBimensuales = [];
        tareasSemestrales = [];
        tareasAnuales = [];
}
}
// Agosto

if (mes === 'Agosto') {
    if (semana == 1) {
        tareasMensuales = ['Bañar a Chucho'];
        tareasBimensuales = [];
        tareasSemestrales = [];
        tareasAnuales = [];
}
    if (semana == 2) {
        tareasMensuales = ['FregarSuelos(Comun)', 'Limpiar escalera (Comun)'];
        tareasBimensuales = [];
        tareasSemestrales = [];
        tareasAnuales = [];
}
    if (semana == 3) {
        tareasMensuales = [];
        tareasBimensuales = [];
        tareasSemestrales = ['Cortinas'];
        tareasAnuales = [];
}
    if (semana == 4) {
        tareasMensuales = ['Limpiar Microondas', 'Limpiar Horno'];
        tareasBimensuales = ['Limpiar Cristales'];
        tareasSemestrales = [];
        tareasAnuales = [];
}
}

// Septiembre 
if (mes === 'Septiembre') {
    if (semana == 1) {
        tareasMensuales = ['Bañar a Chucho'];
        tareasBimensuales = ['Limpiar Coche'];
        tareasSemestrales = [];
        tareasAnuales = []; }
    if (semana == 2) {
        tareasMensuales = ['FregarSuelos(Comun)', 'Limpiar escalera (Comun)'];
        tareasBimensuales = [];
        tareasSemestrales = [];
        tareasAnuales = [];
}
    if (semana == 3) {
        tareasMensuales = [];
        tareasBimensuales = [];
        tareasSemestrales = [ 'Limpieza Cocina a Fondo'];
        tareasAnuales = [];
}
    if (semana == 4) {
        tareasMensuales = ['Limpiar Microondas', 'Limpiar Horno'];
        tareasBimensuales = [];
        tareasSemestrales = [];
        tareasAnuales = []; }
}

// Octubre 
if (mes === 'Octubre') {
    if (semana == 1) {
        tareasMensuales = ['Bañar a Chucho'];
        tareasBimensuales = [];
        tareasSemestrales = [];
        tareasAnuales = []; }
    if (semana == 2) {
        tareasMensuales = ['FregarSuelos(Comun)', 'Limpiar escalera (Comun)'];
        tareasBimensuales = [];
        tareasSemestrales = [];
        tareasAnuales = [];
}
    if (semana == 3) {
        tareasMensuales = [];
        tareasBimensuales = [];
        tareasSemestrales = ['Ordenar Armarios'];
        tareasAnuales = []; }
    if (semana == 4) {
        tareasMensuales = ['Limpiar Microondas', 'Limpiar Horno'];
        tareasBimensuales = ['Limpiar Cristales'];
        tareasSemestrales = [];
        tareasAnuales = [];
}
}

// Noviembre
if (mes === 'Noviembre') {
    if (semana == 1) {
        tareasMensuales = ['Bañar a Chucho'];
        tareasBimensuales = ['Limpiar Coche'];
        tareasSemestrales = [];
        tareasAnuales = []; }
    if (semana == 2) {
        tareasMensuales = ['FregarSuelos(Comun)', 'Limpiar escalera (Comun)'];
        tareasBimensuales = [];
        tareasSemestrales = [];
        tareasAnuales = []; }
    if (semana == 3) {
        tareasMensuales = [];
        tareasBimensuales = [];
        tareasSemestrales = [];
        tareasAnuales = [];
}
    if (semana == 4) {
        tareasMensuales = ['Limpiar Microondas', 'Limpiar Horno'];
        tareasBimensuales = [];
        tareasSemestrales = [];
        tareasAnuales = [];
}
}
// Diciembre

if (mes === 'Diciembre') {
    if (semana == 1) {
        tareasMensuales = ['Bañar a Chucho'];
        tareasBimensuales = [];
        tareasSemestrales = [];
        tareasAnuales = []; }
    if (semana == 2) {
        tareasMensuales = [ 'FregarSuelos(Comun)', 'Limpiar escalera (Comun)'];
        tareasBimensuales = [];
        tareasSemestrales = [];
        tareasAnuales = [];
}
    if (semana == 3) {
        tareasMensuales = [];
        tareasBimensuales = [];
        tareasSemestrales = [];
        tareasAnuales = [];
}
    if (semana == 4) {
        tareasMensuales = ['Limpiar Microondas', 'Limpiar Horno'];
        tareasBimensuales = ['Limpiar Cristales'];
        tareasSemestrales = [];
        tareasAnuales = [];
}
}




////////////////////////////HTML CORREO//////////////////////////////

// Construir el fragmento de HTML
var html = "<html><head><title>Información de la Fecha</title></head><body>";
html += "<p>Fecha: " + numero + " de " + mes + " (" + dia + ")</p>";
html += "<p> Buenos días Adrián, aquí tienes tus tareas:</p>"
html += "<p>Tareas Semanales:</p>";
html += "<ul>";
for (var i = 0; i < tareasSemanales.length; i++) {
    html += "<li>" + tareasSemanales[i] + "</li>";
}
html += "</ul>";

html += "<p>Tareas Quincenales:</p>";
html += "<ul>";
for (var i = 0; i < tareasQuincenales.length; i++) {
    html += "<li>" + tareasQuincenales[i] + "</li>";
}
html += "</ul>";

html += "<p>Tareas Mensuales:</p>";
html += "<ul>";
for (var i = 0; i < tareasMensuales.length; i++) {
    html += "<li>" + tareasMensuales[i] + "</li>";
}
html += "</ul>";

html += "<p>Tareas Bimensuales:</p>";
html += "<ul>";
for (var i = 0; i < tareasBimensuales.length; i++) {
    html += "<li>" + tareasBimensuales[i] + "</li>";
}
html += "</ul>";

html += "<p>Tareas Semestrales:</p>";
html += "<ul>";
for (var i = 0; i < tareasSemestrales.length; i++) {
    html += "<li>" + tareasSemestrales[i] + "</li>";
}
html += "</ul>";


html += "<p>Tareas Anuales:</p>";
html += "<ul>";
for (var i = 0; i < tareasAnuales.length; i++) {
    html += "<li>" + tareasAnuales[i] + "</li>";
}
html += "</ul>";

html += "<p> Disfruta del finde semana :) </p>"
html += "</body></html>";

// Asignar el fragmento HTML a msg.payload
msg.payload = html;

return msg;


