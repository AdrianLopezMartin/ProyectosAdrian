import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

## Cargamos la matriz de datos
M = pd.read_excel('C:/Users/adrian/PycharmProjects/pythonProject10/Consumo_Septiembre.xlsx')
P1=[]
P2=[]
P3=[]

## Preguntamos el primer finde semana y festivos
Dia=int(input('Introduce el numero correspondiente al primer sabado semana: \n'))
respuesta=input('¿Hay festivo?')

findes=[]
if respuesta == 'si':
 Festivo=input('Introduce el dia Festivo')
 findes.append(Festivo)
for i in range(0,5):
  if Dia+1+7*i<=31:
     Sabado=str(Dia+7*i)
     Domingo=str(Dia+1+7*i)
     if len(Sabado) == 1:
       findes.append('0'+ Sabado)
     elif len(Sabado)==2:
       findes.append(Sabado)
     if len(Domingo)==1:
       findes.append('0' + Domingo)
     elif len(Domingo)==2:
       findes.append(Domingo)

      #Creo una funcion para comporbar si es finde semana o no
def ComprobacionFinde(numero: 'str'):
  if numero in findes:
    return 'Si'
  else:
    return 'No'
     #Creo una funcion para extraer el dia de la fecha
def ExtraerDia(Fecha:'str'):
  return Fecha[0:2]
M['Dia']=M['Fecha'].apply(ExtraerDia)
M['Finde']=M['Dia'].apply(ComprobacionFinde)

    #Creo una funcion para sacar el balance neto horario
def KwGenerados(a,b):
    if a-b <=0:
      return (a-b)*-1
    elif a-b >0:
      return 0
def KwImportados(a,b):
    if a-b >0:
        return a-b
    elif a-b<=0:
        return 0

# Creamos una función para aplicar generar la trarifa en funcion del precio.
def Tarifa(finde,Hora):
    if finde == 'Si':
        return 0.109
    else:
        if int(Hora[0:2]) in range(1,9):
            return 0.109
        elif int(Hora[0:2]) in range(9,11) or int(Hora[0:2]) in range(15,19) or int(Hora[0:2]) in range(23,25):
            return 0.151
        else:
            return 0.202


M['KwGenerados']=M.apply(lambda Fila: KwGenerados(Fila['Consumo kWh'],Fila['Exportacion kWh']),axis=1)
M['KwImportados']=M.apply(lambda Fila: KwImportados(Fila['Consumo kWh'],Fila['Exportacion kWh']),axis=1)
M['Tarifa']=M.apply(lambda Fila:Tarifa(Fila['Finde'],Fila['Hora']), axis=1)

## Localizo las posiciones que sean P1 y guardo los datos en un vector P1
for i in range(0,len(M['Tarifa'])):
    if M['Tarifa'][i] == 0.109:
        P1.append(M['KwImportados'][i])

## Localizo las posiciones que sean P1 y guardo los datos en un vector P1
for i in range(0,len(M['Tarifa'])):
    if M['Tarifa'][i] == 0.151:
        P2.append(M['KwImportados'][i])

## Localizo las posiciones que sean P1 y guardo los datos en un vector P1
for i in range(0,len(M['Tarifa'])):
    if M['Tarifa'][i] == 0.202:
        P3.append(M['KwImportados'][i])

KwP1=int(round(sum(P1)))
KwP2=int(round(sum(P2)))
KwP3=int(round(sum(P3)))

KwExportados=sum(np.array(M['KwGenerados']))

Excedentes=round(round(sum(M['KwGenerados']),0)*0.11,2)

Energia=round(round(round(KwP1*0.001,2)+round(KwP1*0.002,2)+round(KwP1*0.106,2),2)+\
        round(round(KwP2*0.02,2)+round(KwP2*0.009,2)+round(KwP2*0.122,2),2)+\
        round(round(KwP3*0.029,2)+round(KwP3*0.044,2)+round(KwP3*0.129,2),2),2)-Excedentes
if Energia < 0:
    Energia=0


Dias=float(np.max(np.array(M['Dia'])))
Potencia=0.083242*Dias*3.3+0.014671*Dias*3.3
BonoSocial=0.038455*Dias
AlquilerEquipos=0.026667*Dias
ImpuestoElectrico=(Energia+Potencia)*0.005
IVA=(Potencia+AlquilerEquipos+BonoSocial+ImpuestoElectrico+Energia)*0.05
Factura=Energia+Potencia+BonoSocial+AlquilerEquipos+ImpuestoElectrico+IVA
M=M.drop(['CUPS','Metodo de obtencion.1'],axis=1)
KwExcedentes=int(round(sum(M['KwGenerados'])))

## Enseñamos por pantalla una estimacion de la factura

print('El precio por energia es de : ', round(Energia,2))
print('Los Kw Excedentes =', int(round(sum(M['KwGenerados']),0)))
print('Kw en P1 =', KwP1)
print('Kw en P2 =', KwP2)
print('Kw en P3 =', KwP3)
print('Los excedentes son = ', Excedentes)
print('La potencia es de:  ', round(Potencia,2))
print('Su factura sera de:  ', round(Factura,2))


## Construimos los vectores de datos por separado para realizar las gráficas

VectorConsumo = M.groupby('Dia')['KwImportados'].sum()
VectorConsumo=VectorConsumo.reset_index()
VectorExcedentes = M.groupby('Dia')['KwGenerados'].sum().reset_index()
VectorP1 = M.groupby(['Dia','Tarifa'])['KwImportados'].sum().reset_index()
VectorP1=pd.DataFrame(VectorP1[VectorP1['Tarifa']==0.109]).reset_index(drop=True)
VectorP1Dia=list(VectorP1['Dia'])
VectorP1KwImportados=list(VectorP1['KwImportados'])

VectorP2 = M.groupby(['Dia','Tarifa'])['KwImportados'].sum().reset_index()
VectorP2=pd.DataFrame(VectorP2[VectorP2['Tarifa']== 0.151])
VectorP2=VectorP2[['Dia','KwImportados']]
VectorP2Dia=list(VectorP2['Dia'])
VectorP2KwImportados=list(VectorP2['KwImportados'])


VectorP3 = M.groupby(['Dia','Tarifa'])['KwImportados'].sum().reset_index()
VectorP3=pd.DataFrame(VectorP3[VectorP3['Tarifa']==0.202])
VectorP3=VectorP3[['Dia','KwImportados']]
VectorP3Dia=list(VectorP3['Dia'])
VectorP3KwImportados=list(VectorP3['KwImportados'])

VectorExcedentes = M.groupby('Dia')['KwGenerados'].sum().reset_index()

## Calculo de proporciones para representación de barras con colores en proporción
ProporcionP1=[]
ProporcionP2=[]
ProporcionP3=[]

for dia in VectorConsumo['Dia']:

    if str(dia) in VectorP1Dia:
        posicion = VectorP1Dia.index(str(dia))
        ProporcionP1.append(VectorP1KwImportados[int(posicion)] / VectorConsumo['KwImportados'][int(posicion)])
    else:
        ProporcionP1.append(0)
    print(str(dia),VectorP2Dia[2])
    if str(dia) in VectorP2Dia:
        posicion=VectorP2Dia.index(str(dia))
        ProporcionP2.append(VectorP2KwImportados[int(posicion) ] / VectorConsumo['KwImportados'][int(posicion) ])
    else:
        ProporcionP2.append(0)
    if str(dia) in VectorP3Dia:
        posicion = VectorP3Dia.index(str(dia))
        ProporcionP3.append(VectorP3KwImportados[int(posicion)] / VectorConsumo['KwImportados'][int(posicion)])
    else:
        ProporcionP3.append(0)

Proporcion=[]
print(len(VectorConsumo['Dia']), 'Tamaño vector consumo')
for i in range(0,len(VectorConsumo['Dia'])):
    Proporcion.append([ProporcionP1[i],ProporcionP2[i],ProporcionP3[i]])

## Diseño de las graficas (Gráfico 1)

# Crear una figura y ejes
fig, ax = plt.subplots()

# Calcular las coordenadas x de las barras
x = VectorConsumo['Dia']
# Calcular las coordenadas y de las barras

kw_importados = VectorConsumo['KwImportados']

proporciones_barras = Proporcion

# Definir colores manualmente para cada proporción
colores = ['#72B2F6','#F7F71B', '#485C42']


# Crear una figura y ejes


# Calcular las coordenadas x de las barras
x = VectorConsumo['Dia']

# Dibujar las barras con colores proporcionales
for j in range(0, len(proporciones_barras)):
    proporcion_colores = proporciones_barras[j]
    inicio=0
    for i, proporcion in enumerate(proporcion_colores):
        color = colores[i % len(colores)]  # Ciclar entre los colores definidos


        ancho = proporcion_colores[i]
        ax.bar(x[j], kw_importados[j]*proporcion, width=1, color=color, edgecolor='black', linewidth=0.5, bottom=inicio)
        inicio=kw_importados[j]*proporcion+inicio
# Configurar el eje x con los días
ax.set_xticks(x)
#ax.set_xticklabels(dias)
ax.set_xlabel('Días')
ax.set_ylabel('KW Importados')

# Añadir una leyenda
leyenda = ['P3 Valle', 'P2 Llano','P1 Punta']
ax.legend(leyenda, loc='upper right')
# Agregar un título
ax.set_title('Consumo Septiembre (Aplicado Balance neto) (Total {} Kwh)'.format(round(VectorConsumo['KwImportados'].sum(),2)))

KwExportados=VectorExcedentes['KwGenerados']
Dias=VectorExcedentes['Dia']

## Diseño de las graficas (Gráfico 1)
# Crear una figura y ejes
fig, ax = plt.subplots()

# Dibujar las barras verdes
ax.bar(Dias,KwExportados, color='green')

# Configurar el título y etiquetas
print(Excedentes)
ax.set_title('Gráfico Excedentes Fotovoltaicos Septiembre (Total {} Kwh)'.format(KwExcedentes))
ax.set_xlabel('Días')
ax.set_ylabel('KwExportados')

# Mostrar el gráfico
plt.show()
