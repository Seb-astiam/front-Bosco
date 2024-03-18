import { NavLink } from "react-router-dom"

export const Nav = () => {
    return (
        <div className="text-white ">
            <NavLink to="/ProfileHousing">
                <button>
                    Create Housing
                </button>
            </NavLink>
        </div>
    )
}
