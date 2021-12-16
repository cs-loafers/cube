from selenium import webdriver  

print("test web!!!")
driver = webdriver.Chrome()
driver.get('http://www.baidu.com')  
print driver.title  
driver.quit()  

driver = webdriver.Chrome()
driver.get("http://localhost:8000/index/")

driver.find_element_by_id("scramble").click()

driver.find_element_by_id("solve").click()

sleep(3)



driver.quit()
