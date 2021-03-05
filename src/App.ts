
import { LitElement, html, css, property, customElement } from 'lit-element';
import "./Login.js"
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports.js";

Amplify.configure(awsconfig);


@customElement('nformat-main')
export class App extends LitElement {

  static styles = css`
  `;

  render() {
    return html`
    <nformat-login></nformat-login>
    `;
  }
}
