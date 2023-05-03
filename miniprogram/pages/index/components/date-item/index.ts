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
      if (this.data.path) {
        wx.navigateTo({
          url: this.data.path
        })
      }
    }
  },
});
