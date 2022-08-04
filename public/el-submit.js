export default class ElSubmit extends HTMLButtonElement {
  constructor () {
    super()
    this.eventname = this.attributes.eventname.value || 'new-data'
    this.submitForm = this.submitForm.bind(this)
    this.addEventListener('click', this.submitForm)
  }
  submitForm (e) {
    if ("fetch" in window) {
        e.preventDefault()
        let form = this.closest('form')
        let body = JSON.stringify(Object.fromEntries(new FormData(form)))
        fetch(form.action, {
            method: form.method,
            body,
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(response => response.json())
        .then(data => {
            const event = new CustomEvent(this.eventname, { bubbles: true, detail: data });
            form.dispatchEvent(event)
        })
        .catch(error => {
          const event = new CustomEvent(this.eventname, { bubbles: true, detail: error });
          form.dispatchEvent(event)
        })
    }
  }
}
customElements.define('el-submit', ElSubmit, { extends: 'button' })
