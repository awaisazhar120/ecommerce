import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FcLike } from "react-icons/fc";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfuly");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">
              <span style={{ position: "relative", top: "-3px" }}>
                <FcLike />
              </span>
              ABC
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>
              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Signup
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{ border: "none" }}
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink to={`/dashboard`} className="dropdown-item">
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item">
                <NavLink to="/cart" className="nav-link">
                  Cart (0)
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;

<li class="dropdown-item pl-0">
                                        <i class="fa-solid fa-camera mx-2"></i>
                                        <a class="" href="javascript:;">{{ $menu->title }}</a>
                                        <div class="mega-menu p-3 position-absolute">
                                            if ($menu->parents->childs && !empty($menu->parents->childs))
                                            <div class="child-cats-mega-menu">
                                                <h5>{{ $menu->parents->title }}</h5>
                                                <ul class="list-unstyled d-inline-block">
                                                    @foreach ($menu->parents->childs as $child)
                                                    <li>
                                                        <a href="{{ category_url($child->id) }}">
                                                            {{ $child->title }}
                                                        </a>
                                                    </li>
                                                    @endforeach
                                                </ul>
                                            </div>
                                            @endif
                                            @if ($menu->stores)
                                            <div class="top-stores-mega-menu">
                                                <h5>Top Stores</h5>
                                                <ul class="list-unstyled d-inline-block">
                                                    @foreach ($menu->stores as $store)
                                                    <li>
                                                        <a href="#">
                                                            {{ $store->title }}
                                                        </a>
                                                    </li>
                                                    @endforeach
                                                </ul>
                                            </div>
                                            @endif
                                            <a href="" class="d-inline-block"><img class="img-fluid h-100" src="https://ti.tradetracker.net/?c=34438&m=2146083&a=411945&r=&t=custom" alt=""></a>
                                        </div>
                                    </li>