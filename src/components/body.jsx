

export default function Body({ children }) {
  return (
    <section className="hero is-fullheight">
      <div className="hero-body">
        <div className="container block">
            { children }
        </div>
      </div>
    </section>
  );
}
