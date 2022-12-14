import { createApiAd } from "./createAdProvider.js";
import { pubSub } from "../pub-sub/pubSub.js";

export class CreateAdController {
  constructor(nodeElement) {
    this.createAdElement = nodeElement;

    this.subscribeToEvents();
    this.textF = false;
    this.inptF = false;
  }

  subscribeToEvents() {
    const createAdButton =
      this.createAdElement.querySelector(".create-ad-button");

    this.createAdElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });

    this.createAdElement.addEventListener("keyup", () => {
      this.validateForm(createAdButton);
    });
    this.createAdElement.addEventListener("click", () => {
      this.validateForm(createAdButton);
    });
    createAdButton.addEventListener("click", () => {
      this.createAd();
    });
  }

  validateForm(createAdButton) {
    const createAdsInputElements = Array.from(
      this.createAdElement.querySelectorAll(".required")
    );

    const createAdsCheckElements = Array.from(
      this.createAdElement.querySelectorAll(".radio")
    );

    createAdsInputElements.forEach((createAdsInputElement) => {
      createAdsInputElement.addEventListener("input", () => {
        const areInputsFilled = createAdsInputElements.every(
          (inputElement) => inputElement.value
        );

        if (areInputsFilled) {
          this.textF = true;
        } else {
          this.textF = false;
        }
        // if (areInputsFilled){
        //   createAdButton.removeAttribute('disabled');
        // }
        // else{
        //   createAdButton.setAttribute('disabled','');
        // }
      });
    });

    createAdsCheckElements.forEach((createAdsCheckElement) => {
      createAdsCheckElement.addEventListener("click", () => {
        const areInputsChecked = createAdsCheckElements.some(
          (inputElement) => inputElement.checked
        );

        if (areInputsChecked) {
          this.inptF = true;
        } else {
          this.inptF = false;
        }
      });
    });

    // Final validation
    if (this.textF && this.inptF) {
      createAdButton.removeAttribute("disabled");
    } else {
      createAdButton.setAttribute("disabled", "");
    }
  }

  async createAd() {
    const formData = new FormData(this.createAdElement);
    // const ad = formData.get({});
    let adString = "{";
    let contador;

    for (const pair of formData.entries()) {
      contador++;

      console.log(`${pair[0]}, ${pair[1]},`);
      // ad.pair[0] = pair[1];
      adString += `"${pair[0]}": "${pair[1]}",`;
    }

    let lastIndex = adString.lastIndexOf(",");
    console.log(lastIndex);
    let ad = adString.slice(0, lastIndex);
    ad += "}";
    console.log(ad);
    ad = JSON.parse(ad);
    // console.log(typeof ad);
    try {
      await createApiAd(ad);
      alert("Anuncio creado con ??xito");
      // pubSub.publish(pubSub.TOPICS.NOTIFICATION_ERROR, `El anuncio se ha creado correctamente.`);
      setTimeout(() => {
        window.location.href = "./";
      }, 1500);
    } catch (error) {
      // alert(`Hubo un error durante la creaci??n del anuncio.`)
      pubSub.publish(
        pubSub.TOPICS.NOTIFICATION_ERROR,
        `Hubo un error durante la creaci??n del anuncio.`
      );
    }
  }
}
