async function create(event, context) {

const result = event.body;

  return {
    statusCode: 200,
    body: result,
  };
}

export const handler = create;