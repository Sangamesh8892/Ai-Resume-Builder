import { Cross, Plus, Sparkle, Sparkles, Trash } from "lucide-react";
import React from "react";

const SkillsForm = ({ data, onChange }) => {
  const [newSkill, setNewSkill] = React.useState("");

  const addSkill = () => {
    if (newSkill.trim() && !data.includes(newSkill.trim())) {
      onChange([...data, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (indexToRemove) => {
    onChange(data.filter((_, index) => index !== indexToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="space-y-4 rounded-xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-slate-900">Skills</h3>
        <p className="text-sm text-slate-500">Add your skills</p>
      </div>

      <div className="flex gap-2 rounded-md border border-dashed border-slate-200 bg-slate-50/80 p-3">
        <input
          type="text"
          placeholder="Enter a skill(e.g., JavaScript,Project Management)"
          className="flex-1 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
          onChange={(e) => setNewSkill(e.target.value)}
          value={newSkill}
          onKeyDown={handleKeyPress}
        />
                <button
                    onClick={addSkill}
                    disabled={!newSkill.trim()}
                    type='button'
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white shadow-md hover:brightness-110 transition"
                >
                    <Plus className="size-4"/>
                    Add Skill
                </button>
      </div>

      {data.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {data.map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-50 to-blue-100 px-3 py-1 text-sm font-medium text-slate-700 ring-1 ring-slate-200"
            >
              {skill}
              <button
                onClick={() => removeSkill(index)}
                className="rounded-full p-1 bg-rose-100  text-slate-500 transition hover:bg-rose-300 hover:text-slate-700"
              >
                <Trash className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50/70 py-10 text-center text-slate-500">
          <Sparkles className="mb-3 h-10 w-10 text-slate-300" />
          <p className="text-base font-medium">No skills added yet</p>
          <p className="text-sm">Add ypur Technical and soft skills above</p>
        </div>
      )}

      <div className="rounded-lg border border-slate-100 bg-indigo-50 p-4 text-sm text-slate-600 ">
        <strong className="font-semibold text-slate-800">Tip:</strong>
        Add 8-12 relevant skills. Include both technical skills(Programming languages,tools) and soft skills(leardership,communication).
      </div>
    </div>
  );
};

export default SkillsForm;
