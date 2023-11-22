from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select
import time

# Ruta al controlador del navegador (ejemplo para Chrome)
driver_path = 'C:\\Users\\pispa\\chromedriver_win32\\chromedriver.exe'  # Cambia esto a la ruta de tu controlador

# Configura las opciones del controlador
chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument('--incognito')  # Agrega la opción para iniciar en modo incógnito
chrome_options.add_argument('--headless')  # Habilita el modo sin cabeza
chrome_options.add_experimental_option("prefs", {
    "download.default_directory": "C:\\Users\\adrian\\Desktop\\DescargaDatosEREDES", #Ubicación Descarga
    "download.prompt_for_download": False,
    "download.directory_upgrade": True,
    "safebrowsing.enabled": True
})


chrome_options.binary_location = r'C:\Program Files\Google\Chrome\Application\chrome.exe'  # Cambia esto a la ruta de tu navegador Chrome

# URL de la página web
url = 'https://misconsumos.eredesdistribucion.es/#/'

# Credenciales
usuario = '*************'
contrasena = '***********'
exito=0

# Inicializa el navegador web
driver = webdriver.Chrome(options=chrome_options)
driver.maximize_window()

# Abre la página web
driver.get(url)

# Encuentra los campos de entrada del usuario y la contraseña
input_usuario = driver.find_element(By.NAME, 'username')  # Reemplaza 'usuario' con el nombre real del campo
input_contrasena = driver.find_element(By.NAME, 'pwd')  # Reemplaza 'password' con el nombre real del campo
while exito==0:
    try:
        # Ingresa las credenciales en los campos
        input_usuario.send_keys(usuario)
        input_contrasena.send_keys(contrasena)

        # Envía el formulario
        input_contrasena.submit()
        WebDriverWait(driver, 200).until(EC.element_to_be_clickable((By.ID, 'onetrust-accept-btn-handler')))
        # E
        boton_cookies=driver.find_element(By.ID,'onetrust-accept-btn-handler')
        boton_cookies.click()
        WebDriverWait(driver, 200).until(EC.presence_of_element_located((By.CSS_SELECTOR, '#dataTable > tbody > tr > td:nth-child(7)')))
        cuadro_consumo = driver.find_element(By.CSS_SELECTOR, '#dataTable > tbody > tr > td:nth-child(7)')
        WebDriverWait(driver, 200).until(EC.presence_of_element_located((By.ID,'see-consumptions')))


        # # Encuentra el boton Consumo

        WebDriverWait(driver, 200).until(EC.presence_of_element_located((By.ID, 'see-consumptions')))
        boton_consumo = cuadro_consumo.find_element(By.ID, 'see-consumptions')

        # Hacer clic en el botón Consumo
        driver.execute_script("arguments[0].click();", boton_consumo)
        WebDriverWait(driver, 200).until(
            EC.element_to_be_clickable((By.ID, 'periodo-consumo'))
        )


        # Encuentra el boton periodo-consumo y haz click
        WebDriverWait(driver, 200).until(EC.presence_of_element_located((By.ID, 'periodo-consumo')))

        elemento_desplegable = driver.find_element(By.ID, 'periodo-consumo')
        selector = Select(elemento_desplegable)

        # Selecciona el elemento "Periodo de tiempo" por su valor
        selector.select_by_value('2')

        WebDriverWait(driver, 200).until(EC.presence_of_element_located((By.ID,'periodo-consumo-2')))

        ## SELECCIONAMOS LA FECHA INICIO
        seleccionar_calendario1=driver.find_element(By.ID,'periodo-consumo-2')

        # Espera a que el elemento con la clase "loading" desaparezca
        WebDriverWait(driver,200).until(EC.invisibility_of_element_located((By.CLASS_NAME, 'loading')))
        seleccionar_calendario1.click()
        
        #Seleccion Mes (En este analisis analizare los datos de ocutbre a septiembre)
        
        WebDriverWait(driver, 200).until(EC.presence_of_element_located((By.XPATH,"//span[text()='octubre']")))

        seleccionar_mes=driver.find_element(By.XPATH,"//span[text()='octubre']")
        seleccionar_mes.click()
        WebDriverWait(driver, 200).until(EC.presence_of_element_located((By.XPATH,"//span[text()='septiembre']")))
        
        # SELECCION DIA 1 DEL MES Septiembre"
        seleccionar_mes1=driver.find_element(By.XPATH,"//span[text()='septiembre']")
        seleccionar_mes1.click()

        elemento_span = driver.find_element(By.XPATH,"//span[text()='1']")
        elemento_span.click()

        seleccionar_calendario2=driver.find_element(By.ID,'periodo-consumo-3')
        seleccionar_calendario2.click()
        #Seleccion Mes

        # SELECCION DIA 1 DEL MES Octubre"
        seleccionar_mes=driver.find_element(By.XPATH,"//span[text()='octubre']")
        seleccionar_mes.click()
        seleccionar_mes2=driver.find_element(By.XPATH,"//span[text()='octubre']")
        seleccionar_mes2.click()

        
        elemento_span = driver.find_element(By.XPATH,"//span[text()='1']")
        elemento_span.click()

        WebDriverWait(driver,200).until(EC.invisibility_of_element_located((By.CLASS_NAME, 'loading')))

        seleccionar_descarga=driver.find_element(By.XPATH,"//span[text()='Descargar informe']")
        driver.execute_script("arguments[0].click();", seleccionar_descarga)
        WebDriverWait(driver,200).until(EC.presence_of_element_located((By.XPATH,"//span[text()='XLSX']")))
        seleccionar_XLS=driver.find_element(By.XPATH,"//span[text()='XLSX']")
        driver.execute_script("arguments[0].click();", seleccionar_XLS)

        WebDriverWait(driver,200).until(EC.invisibility_of_element_located((By.CLASS_NAME, 'loading')))
        time.sleep(10)


        # Cierra el navegador
        driver.quit()
        exito=1
        print('Lo Tengo')
    except:
        print('Hay un error en la pagina')
        driver.quit()
        # En caso de no conseguir los datos lo vuelve a intentar pasados 120 segundos.
        time.sleep(120)
