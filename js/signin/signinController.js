import { pubSub } from "../pub-sub/pubSub.js";
import { loginApiUser } from "./signinProvider.js";

export class SigninController {
    constructor(nodeElement) {
        this.signinElement = nodeElement;
        this.subscribeToEvents();
    }

    subscribeToEvents() {
        this.signinElement.addEventListener('submit', (event) => {
          event.preventDefault();
          this.validatePassword();
        });
    
        const createUserInputElements = Array.from(this.signinElement.querySelectorAll('input'));
        const createUserButtonElement = this.signinElement.querySelector('#createUserButton');
    
        createUserInputElements.forEach(createUserInputElement => {
          createUserInputElement.addEventListener('input', () => {
            const areInputsFilled = createUserInputElements.every(inputElement => inputElement.value);
            if (areInputsFilled) {
              createUserButtonElement.removeAttribute('disabled');
            } else {
              createUserButtonElement.setAttribute('disabled', '');
            }
          })
        })
      }

      validatePassword() {
        const passwordElement = this.signinElement.querySelector('#password');
        const minLength = 6;
        
        if (passwordElement.value.length <= minLength) {
          pubSub.publish(pubSub.TOPICS.NOTIFICATION_ERROR, `La contraseña debe tener más de ${minLength} caracteres`);
        }
    
        const regExp = new RegExp(/^[a-zA-Z0-9]*$/)
    
        if (regExp.test(passwordElement.value)) {
          // hacemos cosas
          this.loginUser();
        } else {
          pubSub.publish(pubSub.TOPICS.NOTIFICATION_ERROR, `La contraseña debe contener únicamente minúsculas, mayúsculas o números`);
        }
      }
    
      async loginUser() {
        const formData = new FormData(this.signinElement);
        const username = formData.get('username');
        const password = formData.get('password');
        
        try {
          // await createApiUser(username, password);
          const jwt = await loginApiUser(username, password);
          // console.log(jwt);
          
          if(jwt){
            localStorage.setItem('token', jwt);
            // alert('Has iniciado sesión correctamente.');
            pubSub.publish(pubSub.TOPICS.NOTIFICATION_ERROR, `Has accedido correctamente.`);
            setTimeout(()=>{
              window.location.href = "./";
            },1500);
          }
          else{
            pubSub.publish(pubSub.TOPICS.NOTIFICATION_ERROR, `El usuario o la contraseña son incorrectos, vuelve a intentarlo.`);
          }
        } catch (error) {
          // la creación de usuario ha fallado
          pubSub.publish(pubSub.TOPICS.NOTIFICATION_ERROR, `El inicio de sesión ha fallado.`);
        }
      }
}