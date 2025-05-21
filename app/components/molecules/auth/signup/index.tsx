import React, {
  // ChangeEvent 
} from "react";

// interface AgentOption {
//   value: string;
//   label: string;
// }

const AgentBuilderForm: React.FC = () => {
  // const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  // const agentOptions: AgentOption[] = [
  //   { value: "individual", label: "Individual" },
  //   { value: "option2", label: "Option 2" },
  //   // Add more agent options as needed
  // ];

  // const handleAgentChange = (e: ChangeEvent<HTMLSelectElement>) => {
  //   setSelectedAgent(e.target.value);
  // };

  // const renderFormFields = () => {
  //   // Map your form fields based on the selected agent
  //   switch (selectedAgent) {
  //     case "individual":
  //       return (
  //         <div>
  //           <label>Field 1:</label>
  //           <input type="text" name="field1" />
  //           {/* Add more fields specific to option1 */}
  //         </div>
  //       );
  //     case "option2":
  //       return (
  //         <div>
  //           <label>Field 2:</label>
  //           <textarea name="field2"></textarea>
  //           {/* Add more fields specific to option2 */}
  //         </div>
  //       );
  //     // Add more cases for additional options

  //     default:
  //       return null;
  //   }
  // };

  return (
    <div>
      {/* <label>Select Agent:</label>
      <select onChange={handleAgentChange}>
        <option value="" disabled selected>
          Select an Agent
        </option>
        {agentOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Render form fields based on the selected agent */}
      {/* {selectedAgent && renderFormFields()} */}

      {/* Additional common form fields can be added here */}
      {/* <div>
        <label>Common Field:</label>
        <input type="text" name="commonField" />
      </div>  */}
    </div>
  );
};

export default AgentBuilderForm;
