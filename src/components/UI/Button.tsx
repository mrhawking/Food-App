import { Link, NavLink } from 'react-router-dom';
import classes from './Button.module.css';

type LinkProps = {
  children: React.ReactNode;
  url: string;
  className?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return <button className={`${classes.button} ${className}`} {...props}>{children}</button>;
}
export const ButtonLink: React.FC<LinkProps> = ({ children, url,className, ...props }) => {
  return <Link to={url} className={`${classes.button} ${className}`} {...props}>{children}</Link>;
}
export const ButtonNavLink: React.FC<LinkProps> = ({ children, url, ...props }) => {
  return <NavLink to={url} className={({ isActive }) => isActive ? `${classes.active} ${classes.button}` : classes.button} {...props}>{children}</NavLink>;
}