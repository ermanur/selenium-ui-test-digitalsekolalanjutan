const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");

async function saucedemoLoginTest() {
  describe("Saucedemo Login Test", function () {
    let driver;
    let browserName = "chrome";

    beforeEach(async function () {
      // Menambahkan timeout
      this.timeout(30000); // 10.000 ms = 10 detik

      // Membuat koneksi dengan webdriver
      driver = await new Builder().forBrowser(browserName).build();
      await driver.get("https://saucedemo.com");
      //simpan cookie
      cookies = await driver.manage().getCookies();
    });

    it("TC01-Login Success", async function () {
      //panggil cookie

      await driver.findElement(By.id("user-name")).sendKeys("standard_user");
      await driver
        .findElement(By.xpath("//input[@id='password']"))
        .sendKeys("secret_sauce");

      await driver.findElement(By.name("login-button")).click();

      //assertion
      let titleText = await driver.findElement(By.css(".app_logo")).getText();
      assert.strictEqual(
        titleText.includes("Swag Lab"),
        true,
        'Title does not include "Swag Labs"'
      );
      console.log("Testing Login Success!");
    }),
    it("TC02-Login Failed, Password failed", async function () {
      await driver
      .findElement(By.id("user-name"))
      .sendKeys("standard_user");
      await driver
      .findElement(By.xpath("//input[@id='password']"))
      .sendKeys("passwordsalah");
        
      await driver.findElement(By.name("login-button")).click();
        
      //assertion
      let errorMessage = await driver
      .findElement(By.css(".error-message-container"))
      .getText();
      assert.strictEqual(
      errorMessage.includes("Username and password do not match"),
      true,
      "Error Message do not match"
      );
      console.log("Testing Login Failed = Success!");
      });
      
      it("TC03-Login Failed, Password failed", async function () {
        await driver
        .findElement(By.xpath("//input[@id='password']"))
        .sendKeys("secret_sauce");

        await driver.findElement(By.name("login-button")).click();

        //assertion
        let errorMessage = await driver
          .findElement(By.css(".error-message-container"))
          .getText();
        assert.strictEqual(
          errorMessage.includes("Epic sadface: Username is required"),
          true,
          "Error Message  Username is required"
        );
        console.log("Testing Login Failed = Success!");
        });
        
        it("TC04 -Login Failed Password Empty", async function () {
          await driver
            .findElement(By.id("user-name"))
            .sendKeys("standard_user");

          await driver.findElement(By.name("login-button")).click();

          //assertion
          let errorMessage = await driver
            .findElement(By.css(".error-message-container"))
            .getText();
          assert.strictEqual(
            errorMessage.includes("Epic sadface: Password is required"),
            true,
            "Error Message Password is required"
          );
          console.log("Testing Login Failed = Success!");
          });

          it("TC05 -Login Failed Isername and Password Empty", async function () {
          await driver.findElement(By.name("login-button")).click();

          //assertion
          let errorMessage = await driver
            .findElement(By.css(".error-message-container"))
            .getText();
          assert.strictEqual(
            errorMessage.includes("Epic sadface: Username is required"),
            true,
            "Error Message  Username is required"
          );
          console.log("Testing Login Failed = Success!");
            });

        it("TC06-Login Failed, Username Failed", async function () {
          await driver.findElement(By.id("user-name")).sendKeys("erma");
          await driver
            .findElement(By.xpath("//input[@id='password']"))
            .sendKeys("secret_sauce");
  
          await driver.findElement(By.name("login-button")).click();
  
            //assertion
            let errorMessage = await driver
            .findElement(By.css(".error-message-container"))
            .getText();
          assert.strictEqual(
            errorMessage.includes("Username and password do not match"),
            true,
            "Error Message do not match"
          );
          console.log("Testing Login Failed = Success!");
        });
    afterEach(async function () {
      await driver.quit();
    });
  });
}

saucedemoLoginTest();
