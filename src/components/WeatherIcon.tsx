import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Snowflake,
  Sun,
  Thermometer,
  type LucideIcon,
} from "lucide-react";

type WeatherIconProps = {
  code: number;
  className?: string;
};

type WeatherIconConfig = {
  Icon: LucideIcon;
  color: string;
};

function getWeatherIconConfig(code: number): WeatherIconConfig {
  switch (code) {
    case 0:
      return { Icon: Sun, color: "text-amber-500" };
    case 1:
    case 2:
      return { Icon: CloudSun, color: "text-amber-500" };
    case 3:
      return { Icon: Cloud, color: "text-slate-400 dark:text-slate-300" };
    case 45:
    case 48:
      return { Icon: CloudFog, color: "text-slate-400 dark:text-slate-300" };
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
      return { Icon: CloudDrizzle, color: "text-sky-500 dark:text-sky-400" };
    case 61:
    case 63:
      return { Icon: CloudRain, color: "text-sky-500 dark:text-sky-400" };
    case 65:
    case 66:
    case 67:
      return { Icon: CloudRain, color: "text-blue-500 dark:text-blue-400" };
    case 71:
    case 73:
    case 75:
      return { Icon: CloudSnow, color: "text-sky-400 dark:text-sky-300" };
    case 77:
      return { Icon: Snowflake, color: "text-sky-400 dark:text-sky-300" };
    case 80:
    case 81:
    case 82:
      return { Icon: CloudRain, color: "text-sky-500 dark:text-sky-400" };
    case 85:
    case 86:
      return { Icon: CloudSnow, color: "text-sky-400 dark:text-sky-300" };
    case 95:
    case 96:
    case 99:
      return { Icon: CloudLightning, color: "text-amber-500 dark:text-amber-400" };
    default:
      return { Icon: Thermometer, color: "text-slate-400 dark:text-slate-300" };
  }
}

export function WeatherIcon({ code, className = "" }: WeatherIconProps) {
  const { Icon, color } = getWeatherIconConfig(code);

  return <Icon aria-hidden="true" className={`${color} ${className}`} />;
}
