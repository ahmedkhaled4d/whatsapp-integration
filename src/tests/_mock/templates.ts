export const savedTemplates = {
  hello_world: {
    name: "hello_world",
    language: {
      code: "en_US"
    }
  },
  takweed_request: {
    name: "takweed_request",
    language: {
      code: "ar"
    }
  },
  welcome_takweed: {
    name: "welcome_takweed",
    language: {
      code: "ar"
    }
  },
  otp_verify_takweed: {
    name: "otp_verify_takweed",
    language: {
      code: "ar"
    }
  },
  certificate_generated: {
    name: "certificate_generated",
    language: {
      code: "ar"
    },
    components: [
      {
        type: "body",
        parameters: [
          {
            type: "text",
            text: "string"
          }
        ]
      }
    ]
  },
  image_test_template: {
    name: "image_test_template",
    language: {
      code: "ar"
    },
    components: [
      {
        type: "header",
        parameters: [
          {
            type: "image",
            image: {
              link: "http(s)://the-url"
            }
          }
        ]
      }
    ]
  },
  start_of_season: {
    name: "start_of_season",
    language: {
      code: "ar"
    },
    components: [
      {
        type: "header",
        parameters: [
          {
            type: "image",
            image: {
              link: "http(s)://the-url"
            }
          }
        ]
      },
      {
        type: "body",
        parameters: [
          {
            type: "text",
            text: "string"
          }
        ]
      }
    ]
  },
  takweed_requirements: {
    name: "takweed_requirements",
    language: {
      code: "ar"
    },
    components: [
      {
        type: "header",
        parameters: [
          {
            type: "document",
            document: {
              link: "http(s)://the-url",
              filename: "takweed requirements"
            }
          }
        ]
      }
    ]
  }
};
