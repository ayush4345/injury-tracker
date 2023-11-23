import { useState } from "react";
import { Textarea } from "~/components/ui/textarea";

export interface InputData {
  part: string;
  value: string;
}

export default function InjuryInfo(props:any){

    const [info,setInfo] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const inputValue = e.target.value;
      props.onInputChange(props.data, inputValue);
    };

    return (
        <div className="mb-4">
        <label
          htmlFor="phone"
          className="mb-2 block font-semibold text-gray-100"
        >
          {props.data}
        </label>
        <Textarea
          id="injury"
          value={props.value}
          onChange={handleChange}
          // className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-100 shadow focus:outline-none"
        />
      </div>
    )
}