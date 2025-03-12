export interface LangflowResponse {
    session_id: string;
    outputs: {
      inputs: { input_value: string };
      outputs: {
        results: {
          message: {
            text: string;
            data: {
              timestamp: string;
              sender: string;
              sender_name: string;
              text: string;
            };
          };
        };
      }[];
    }[];
  }