const selenium = require('selenium-webdriver')
const chromedriver = require('chromedriver')
const By = selenium.By

const driver = new selenium.Builder()
  .forBrowser('chrome')
  .build()

driver.get(process.env.URL)

const locators = {
  inviteeForm: By.id('registrar'),
  inviteeNameField: By.css('#registrar input[name="name"]')
}

function addInvitee(name){
  driver.findElement(locators.inviteeNameField)
  .sendKeys(name)
  driver.findElement(locators.inviteeForm).submit()
}

addInvitee('Jay Cribas')
addInvitee('Shirley Manson')
addInvitee('Frank Stein')
addInvitee('Foo Bar')
addInvitee('Diane Kitten')
