/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom"
import Header from "../components/Header";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";



export default function Layout({data}) {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${theme}`}>
      {data && <Header />}
      <Outlet/>
    </div>
  )
}
