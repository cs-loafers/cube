from selenium import webdriver  

print("test web!!!")
driver = webdriver.Chrome()
driver.get('http://www.baidu.com')  
print driver.title  
driver.quit()  

#driver = webdriver.Chrome()
#driver.get("http://localhost:8000/index/")

#ele = driver.find_element_by_xpath('/html/body/form/input[7]')
#ele.click()
#sleep(2)
#if ele.is_selected():
#    print('pass')
#sleep(3)



#driver.quit()
