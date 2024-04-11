export default function StepMessage({ step, children }: { step: number; children: React.ReactNode }) {
  return (
    <div className="message">
      <h3>Step {step}</h3>
      {children}
    </div>
  );
}
