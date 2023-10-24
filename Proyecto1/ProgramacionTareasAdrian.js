// Code added here will be run once
// whenever the node is started.

/////////////////////Definición de variables/////////////////////////////////

var tiempo = msg.payload;
var marcaDeTiempo = new Date(msg.payload);
var numero = marcaDeTiempo.getDate();
var mes = marcaDeTiempo.getMonth();
var dia = marcaDeTiempo.getDay();
var meses = [];
var dias = [];
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
 
/////////////////////////////////////////////////////
dias=['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
// Dias de cada mes 'Enero':31,'Febrero':29,'Marzo':31,'Abril':30,'Mayo':31,'Junio':30,'Julio':31,'Agosto':31,'Septiembre':30,'Octubre':31,'Noviembre':30,'Diciembre':31
meses=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
todasTareasBimensuales=['Limpiar Cristales'];
tareasSemanales= ['Ordenar Casa (Modo Elsa)','Limpiar Baño Arriba','Limpiar Baño Abajo','Barrer Porche','Limpiar Comedero y Bebedero','Colada (Común)','Mudar Cama (Común)'];
todasTareasQuincenales = ['Poner Conga arriba','Nevera'];
todasTareasMensuales=['FregarSuelos(Comun)'];
todasTareasAnuales=['Parrilla','Limpieza Paneles', 'Revision Congelador'];
todasTareasSemestrales=['Ordenar Armarios','Limpieza Cocina a Fondo', 'Despensa','Revision Medicamentos', 'Cortinas'];

///////////////////////////Asignación Tareas/////////////////////////

// Asignacion Tareas Quincenales
if(numero % 2 == 0 && ['Octubre','Enero','Marzo','Junio','Julio','Septiembre'].includes(meses[mes]) || numero % 2 !== 0 && ['Febrero','Abril','Mayo','Agosto'].includes(meses[mes]) ){
    tareasQuincenales=todasTareasQuincenales;
    if( numero<=15 && ['Febrero','Abril','Junio','Agosto','Octubre','Diciembre'].includes(meses[mes])){tareasBimensuales=todasTareasBimensuales}

}
// Asignacion Tareas Mensuales
else if(numero<=15 ){
    // Aignación Resto tareas
    if ( ['Febrero', 'Abril', 'Junio', 'Agosto', 'Octubre', 'Diciembre'].includes(meses[mes])) { tareasBimensuales = todasTareasBimensuales }
    if ('Noviembre'==meses[mes]){
        tareasSemestrales=[todasTareasSemestrales[0],todasTareasSemestrales[4]];
        tareasAnuales= todasTareasAnuales[2]
    }
    if ('Diciembre'== meses[mes] ){
        tareasSemestrales=todasTareasSemestrales[2]
    }
    if ('Enero'== meses[mes] ){
        tareasSemestrales=todasTareasSemestrales[3]
    }
    if ('Abril'== meses[mes] ){
        tareasSemestrales=[todasTareasSemestrales[0]]
    if ('Marzo'== meses[mes] ){
        tareasAnuales=todasTareasAnuales[0]
    }
    if ('Junio'== meses[mes] ){
        tareasAnuales=todasTareasAnuales[1]
        tareasSemestrales=[todasTareasSemestrales[2],todasTareasSemestrales[4]]
    }
    }
    tareasMensuales=todasTareasMensuales.slice(0,2)}
else if(numero>15){
    tareasMensuales=todasTareasMensuales[3]
    if ('Abril'== meses[mes] ){
        tareasSemestrales=[todasTareasSemestrales[1]]}
    if ('Noviembre'==meses[mes]){
        tareasSemestrales=todasTareasSemestrales[1]}   
}
////////////////////////////HTML CORREO//////////////////////////////

// Construir el fragmento de HTML
var html = "<html><head><title>Información de la Fecha</title></head><body>";
html += "<p>Fecha: " + numero + " de " + meses[mes] + " (" + dias[dia] + ")</p>";
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