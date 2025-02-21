const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");

async function saucedemoLoginTest() {
  describe("Saucedemo Login Test", function (done) {
    it("TC01-Login Success", async function () {
      // Menambahkan timeout
      this.timeout(20000); // 10.000 ms = 10 detik

      // Script login success
      // Membuat koneksi dengan webdriver
      let driver = await new Builder().forBrowser("chrome").build();

      // Exception Handling & Conclusion
      try {
        // Buka URL di browser
        await driver.get("https://saucedemo.com");

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
      } finally {
        await driver.quit();
      }
    }),
      it("TC02-Login Failed", async function () {
        // Menambahkan timeout
        this.timeout(20000); // 10.000 ms = 10 detik

        // Script login failed
        // Membuat koneksi dengan webdriver
        let driver = await new Builder().forBrowser("chrome").build();

        // Exception Handling & Conclusion
        try {
          // Buka URL di browser
          await driver.get("https://saucedemo.com");

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
        } finally {
          await driver.quit();
        }
      });
  });
}

saucedemoLoginTest();
