// src/components/encabezado/Encabezado.tsx
import React from "react";
import { ShoppingBag, Search, Menu, X, User, ArrowRight, } from "lucide-react";
import { Link } from "react-router-dom";
import { useEncabezado } from "../../hooks/encabebzado/useEncabezado";
import "./encabezado.css";

interface Props {
  showBanner?: boolean;
}

const Encabezado: React.FC<Props> = ({
  showBanner = true,
}) => {

  const {
    // menu
    menuOpen,
    setMenuOpen,
    // search
    search,
    setSearch,
    resultados,
    showDropdown,
    setShowDropdown,
    searchRef,
    handleSearchSubmit,
    // scroll
    scrolled,
    // profile
    profileOpen,
    setProfileOpen,
    profileRef,
    handleLogout,
    getInitial,
    isAuthenticated,
    // navigation
    handleProtectedClick,
    // carrito
    cartCount,
  } = useEncabezado();

  return (
    <>
      {/* OVERLAY */}
      <div
        className={`menu-overlay ${menuOpen ? "active" : ""
          }`}
        onClick={() => setMenuOpen(false)}
      />
      {/* DRAWER MOBILE */}
      <nav
        className={`mobile-drawer ${menuOpen ? "open" : ""
          }`}
      >
        <div className="drawer-header">

          <span className="logo-mark">
            S<span>&amp;</span>O
          </span>

          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Cerrar menú"
          >
            <X size={24} />
          </button>

        </div>

        {/* SEARCH MOBILE */}
        <form
          onSubmit={handleSearchSubmit}
          className="search-bar mobile-search"
        >

          <Search
            size={15}
            className="search-icon"
          />

          <input
            type="text"
            placeholder="¿Qué buscas?"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </form>
        {/* LINKS */}
        <ul onClick={() => setMenuOpen(false)}>
          <li>
            <Link to="/">
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/productos">
              Productos
            </Link>
          </li>
          <li>
            <Link to="/nosotros">
              Nosotros
            </Link>
          </li>
          <li>
            <Link to="/contacto">
              Contacto
            </Link>
          </li>
          <li
            onClick={(e) =>
              handleProtectedClick(
                e,
                "/pedidos"
              )
            }
          >
            <span>Pedidos</span>
          </li>
        </ul>
      </nav>
      {/* HEADER */}
      <header
        className={`site-header ${scrolled ? "scrolled" : ""
          }`}
      >
        {/* LOGO */}
        <Link to="/" className="logo">
          <span className="logo-mark">
            S<span>&amp;</span>O
          </span>
          <span className="logo-sub">
            Repuestos
          </span>
        </Link>
        {/* SEARCH */}
        <div
          className="search-bar-wrap"
          ref={searchRef}
        >
          <form
            onSubmit={handleSearchSubmit}
            className="search-bar"
          >
            <Search
              size={15}
              className="search-icon"
            />
            <input
              type="text"
              placeholder="Buscar producto..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              onFocus={() =>
                resultados.length > 0 &&
                setShowDropdown(true)
              }
            />

          </form>

          {/* DROPDOWN */}
          {showDropdown &&
            search.trim().length >= 2 && (

              <div className="search-dropdown">

                {resultados.length > 0 ? (

                  resultados
                    .slice(0, 6)
                    .map((producto) => (

                      <Link
                        key={producto.idproducto}
                        to={`/producto/${producto.idproducto}`}
                        className="search-item"
                        onClick={() => {

                          setShowDropdown(false);

                          setSearch("");

                        }}
                      >

                        <div className="search-item-img">

                          <img
                            src={producto.imgurl}
                            alt={producto.nombre}
                          />

                        </div>

                        <div className="search-item-info">

                          <p className="search-item-name">
                            {producto.nombre}
                          </p>

                          <p className="search-item-marca">
                            {producto.marca}
                          </p>

                        </div>

                        <span className="search-item-precio">
                          S/{" "}
                          {producto.preciodesct.toFixed(2)}
                        </span>

                      </Link>

                    ))

                ) : (

                  <p className="search-no-results">
                    No se encontraron productos
                  </p>

                )}

              </div>

            )}

        </div>

        {/* NAV DESKTOP */}
        <nav className="main-nav desktop-nav">

          <Link to="/">
            Inicio
          </Link>

          <Link to="/productos">
            Productos
          </Link>

          <Link to="/nosotros">
            Nosotros
          </Link>

          <Link to="/contacto">
            Contacto
          </Link>

          <Link
            to="/pedidos"
            onClick={(e) =>
              handleProtectedClick(
                e,
                "/pedidos"
              )
            }
          >
            Pedidos
          </Link>

        </nav>

        {/* ACTIONS */}
        <div className="header-actions">

          {/* CARRITO */}
          <button
            className="cart-btn"
            onClick={(e) =>
              handleProtectedClick(
                e,
                "/carrito"
              )
            }
          >

            <ShoppingBag size={22} />

            {cartCount > 0 && (

              <span className="cart-badge">
                {cartCount}
              </span>

            )}

          </button>

          {/* PERFIL */}
          <div
            className="profile-container"
            ref={profileRef}
          >

            {isAuthenticated ? (

              <>

                <button
                  className="profile-initial-btn"
                  onClick={() =>
                    setProfileOpen(
                      !profileOpen
                    )
                  }
                >

                  <span className="profile-initial">
                    {getInitial()}
                  </span>

                </button>

                {profileOpen && (

                  <div className="profile-dropdown">

                    <Link
                      to="/perfil"
                      className="profile-dropdown-item"
                      onClick={() =>
                        setProfileOpen(false)
                      }
                    >
                      Ver mi perfil
                    </Link>

                    <button
                      className="profile-dropdown-item logout"
                      onClick={handleLogout}
                    >
                      Cerrar sesión
                    </button>

                  </div>

                )}

              </>

            ) : (

              <button
                className="profile-btn"
                onClick={(e) =>
                  handleProtectedClick(
                    e,
                    "/perfil"
                  )
                }
              >

                <User size={16} />

              </button>

            )}

          </div>

          {/* MENU BUTTON */}
          <button
            className="menu-toggle"
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            aria-label="Abrir menú"
          >

            <Menu size={20} />

          </button>

        </div>

      </header>

      {/* HERO */}
      {showBanner && (

        <div className="hero-wrapper">

          <main className="hero">

            <div
              className="hero-grid-lines"
              aria-hidden="true"
            />

            {/* TEXTO */}
            <div className="hero-text">

              <div className="hero-label">
                Componentes de calidad
              </div>

              <h1 className="hero-title">

                Los
                <br />

                mejores
                <br />

                <em>precios</em>

              </h1>

              <p className="hero-desc">
                Calidad garantizada en
                componentes de alto
                rendimiento para tu vehículo.
              </p>

              <Link
                to="/productos"
                className="hero-cta"
              >

                Ver catálogo

                <ArrowRight size={16} />

              </Link>

              {/* STATS */}
              <div className="hero-stats">

                <div className="stat-item">

                  <span className="stat-num">
                    5K+
                  </span>

                  <span className="stat-label">
                    Productos
                  </span>

                </div>

                <div className="stat-item">

                  <span className="stat-num">
                    10+
                  </span>

                  <span className="stat-label">
                    Años
                  </span>

                </div>

                <div className="stat-item">

                  <span className="stat-num">
                    98%
                  </span>

                  <span className="stat-label">
                    Satisfacción
                  </span>

                </div>

              </div>

            </div>

            {/* IMAGEN */}
            <div className="hero-image">

              <div
                className="image-glow"
                aria-hidden="true"
              />

              <img
                src="https://res.cloudinary.com/dfmveqhud/image/upload/q_auto/f_auto/v1777109036/bn_cf3fw5.png"
                alt="Repuesto destacado"
                className="hardware-render"
              />

            </div>

          </main>

        </div>

      )}

    </>
  );
};

export default Encabezado;
