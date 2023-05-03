Component({
  properties: {
    did: { type: String },
    show: { type: Boolean },
    content: { type: String },
    title: { type: String },
    term: { type: String },
    path: { type: String },
    index: { type: Number }
  },
  methods: {
    handleSet() {
      this.triggerEvent('click', this.data);
    }
  }
});
