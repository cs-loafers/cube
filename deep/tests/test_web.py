from selenium import webdriver  

print("test web!!!")
driver = webdriver.Chrome()
driver.get('http://www.baidu.com')  
print driver.title  
driver.quit()  
