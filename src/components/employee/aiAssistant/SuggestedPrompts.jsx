// src/components/employee/aiAssistant/SuggestedPrompts.jsx
const SuggestedPrompts = ({ prompts, onSelect, disabled }) => (
    <div className="flex flex-wrap gap-2">
        {prompts.map((p) => (
            <button
                key={p}
                type="button"
                disabled={disabled}
                onClick={() => onSelect(p)}
                className="rounded-full border border-[var(--line)] bg-white px-3.5 py-1.5 text-xs font-medium text-[var(--ink)] hover:border-[var(--ink)] transition-colors disabled:opacity-50"
            >
                {p}
            </button>
        ))}
    </div>
);

export default SuggestedPrompts;
