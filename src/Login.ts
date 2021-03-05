import { LitElement, css, html, customElement, internalProperty } from 'lit-element';
import "@vaadin/vaadin-login";
import { Auth } from "aws-amplify";

@customElement('nformat-login')
export class Login extends LitElement {

  @internalProperty()
  private user = {
  };

  private i18n = {
    form: {
      title: 'nFormat - Log in',
      username: 'Email',
      password: 'Passwort',
      submit: 'Log in',
      forgotPassword: 'Passwort vergessen'
    },
    errorMessage: {
      title: 'Falsche Zugangsdaten',
      message: 'Versuchen Sie es noch einmal'
    }
  }

  static styles = css`
    :host {
      display: flex;
      justify-content: center;
      background: var(--main-background);
      padding: var(--main-padding);
    }
  `;

  render() {
    return html`
      <main>
        <vaadin-login-form
        .i18n="${this.i18n}"
        @login="${this.handleLogin}"
        @forgot-password="${this.handleForgotPassword}"></vaadin-login-form>
      </main>
    `;
  }

  private async signIn(username: string, password: string) {
    try {
      this.user = await Auth.signIn(username, password);
    } catch (error) {
      console.log("Error signing in", error)
    }
  }

  private handleLogin(e: CustomEvent) {
    this.signIn(e.detail.username, e.detail.password)
    console.log(this.user)
  }

  private handleForgotPassword(e: CustomEvent) {
     // TODO Implement Dialog
     console.log(e)
  }
}
