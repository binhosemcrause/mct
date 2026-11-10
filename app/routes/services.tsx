import { Link } from "react-router";
import type { Route } from "./+types/services";
import { pages } from "~/config/pages";
import { services, type ServiceSlug } from "~/content/services";
import { cx } from "~/lib/cx";
import { pageMeta } from "~/lib/seo";

export function meta(_: Route.MetaArgs) {
  const page = pages["/services"]!;
  return pageMeta({ title: page.title, description: page.description, path: "/services" });
}

/**
 * Each service is an organic shape, traced from the design. On wide screens they float in a
 * loose cluster (positions in % of the stage, `lg:` classes); on phones they stack, alternating
 * left and right. `label` places the words where the design has them (centre point, % of shape).
 */
const shapes: Record<
  ServiceSlug,
  {
    path: string;
    viewBox: string;
    fill: string;
    stage: string;
    mobile: string;
    label: { x: string; y: string; lines: string[] };
  }
> = {
  counselling: {
    viewBox: "0 0 358 323",
    path: "M160 323C144 325 139 324 128 322C118 320 106 317 95 312C83 307 71 298 61 291C51 283 42 274 35 265C28 257 23 248 18 237C13 226 8 213 5 199C2 186 -0 169 -0 156C-0 143 2 130 4 121C7 111 10 106 14 99C19 92 15 94 30 81C44 68 87 34 103 22C120 10 119 11 127 8C134 5 140 3 148 2C156 0 158 -2 175 -0C192 1 230 5 250 10C269 15 281 22 294 32C307 42 319 57 327 69C336 81 338 91 343 105C347 118 353 135 355 150C358 166 358 186 357 198C355 210 350 214 346 221C342 229 341 232 330 243C320 253 301 273 283 284C266 295 244 303 224 309C203 316 176 321 160 323Z",
    fill: "fill-sun",
    stage: "lg:left-[8.4%] lg:top-[13.8%] lg:w-[24.2%] lg:h-[53.7%]",
    mobile: "self-start w-[80%] aspect-[358/323]",
    label: { x: "48%", y: "51%", lines: ["counselling"] },
  },
  "creative-arts-therapy": {
    viewBox: "0 0 335 358",
    path: "M133 358C121 360 117 358 108 356C100 355 91 352 82 347C73 343 63 337 55 331C47 325 40 318 33 311C27 304 20 296 16 288C11 280 6 270 4 262C1 253 -0 245 -0 237C-0 229 0 223 4 214C7 206 9 200 20 186C30 172 54 149 68 128C82 108 95 76 104 61C114 45 116 43 125 35C134 28 147 21 159 16C171 11 185 6 197 3C208 1 219 -1 229 -0C239 -0 248 1 258 5C267 8 279 14 286 22C294 30 298 35 304 54C309 73 312 110 317 135C323 160 331 191 334 206C337 222 336 221 335 228C334 234 334 239 331 247C327 255 321 266 313 275C305 283 305 286 282 298C260 310 203 336 178 346C153 356 145 356 133 358Z",
    fill: "fill-secondary-1",
    stage: "lg:left-[29.7%] lg:top-[38.4%] lg:w-[22.6%] lg:h-[59.5%]",
    mobile: "self-end w-[78%] -mt-10 aspect-[335/358]",
    label: { x: "50%", y: "63%", lines: ["creative arts", "therapy"] },
  },
  "dance-movement-therapy": {
    viewBox: "0 0 295 401",
    path: "M200 400C189 401 178 400 168 396C157 392 146 384 139 375C132 366 126 357 125 343C123 328 129 302 129 289C129 276 127 272 123 265C118 258 114 252 102 246C90 239 64 233 52 227C40 220 36 217 28 209C21 201 12 189 7 178C3 167 1 152 0 142C-1 132 1 126 3 119C5 111 9 103 12 97C15 90 19 85 23 80C28 74 31 70 40 64C49 59 61 52 77 49C93 45 121 51 136 45C151 39 158 19 168 12C179 5 188 3 197 3C206 3 217 6 225 11C233 15 239 23 243 31C247 39 250 48 249 59C247 70 237 88 234 98C232 107 232 110 234 115C236 121 236 123 244 131C252 140 275 158 283 168C291 177 290 182 292 188C294 195 296 200 295 209C294 218 293 231 287 244C280 257 261 272 256 288C252 303 261 324 260 337C260 349 258 355 253 363C248 372 240 382 232 388C223 394 211 399 200 400Z",
    fill: "fill-accent-1",
    stage: "lg:left-[45.6%] lg:top-[0.0%] lg:w-[19.9%] lg:h-[66.6%]",
    mobile: "self-start w-[66%] -mt-10 aspect-[295/401]",
    label: { x: "48%", y: "37%", lines: ["dance", "movement", "therapy"] },
  },
  workshops: {
    viewBox: "0 0 359 328",
    path: "M265 328C253 329 236 329 221 327C205 325 186 322 170 318C154 313 137 308 122 302C107 296 93 289 80 282C67 274 55 266 45 258C36 250 29 243 22 234C16 226 10 216 6 207C3 198 0 191 0 180C0 169 4 151 6 142C9 133 12 130 16 126C20 121 14 121 30 112C46 104 83 90 109 74C136 58 167 28 189 15C211 3 227 2 239 -0C252 -3 256 -1 264 0C272 2 280 4 287 7C294 9 298 12 304 16C310 21 315 23 322 33C329 42 340 58 346 75C351 92 355 109 357 134C359 158 360 197 358 221C356 244 349 262 345 275C340 288 336 290 331 297C326 303 321 307 314 312C308 316 300 320 292 322C284 325 277 327 265 328Z",
    fill: "fill-primary-1",
    stage: "lg:left-[66.1%] lg:top-[23.1%] lg:w-[24.2%] lg:h-[54.5%]",
    mobile: "self-end w-[80%] -mt-6 aspect-[359/328]",
    label: { x: "58%", y: "57%", lines: ["therapeutic", "workshops"] },
  },
};

export default function Services() {
  return (
    <section aria-labelledby="services-title" className="aura-soft relative overflow-hidden">
      <h1 id="services-title" className="sr-only">
        Our services
      </h1>
      <ul className="mx-auto flex max-w-xl flex-col px-gutter py-12 lg:relative lg:my-10 lg:aspect-[1482/602] lg:max-w-none lg:p-0">
        {services.map((service) => {
          const shape = shapes[service.slug];
          return (
            <li
              key={service.slug}
              className={cx(
                "relative",
                shape.mobile,
                "lg:absolute lg:mt-0 lg:aspect-auto",
                shape.stage,
              )}
            >
              <Link
                to={`/services/${service.slug}`}
                className="group relative block size-full rounded-full text-ink no-underline"
                prefetch="intent"
              >
                <svg
                  aria-hidden="true"
                  viewBox={shape.viewBox}
                  preserveAspectRatio="none"
                  className={cx(
                    "absolute inset-0 size-full transition-transform duration-700 ease-organic group-hover:scale-[1.04] group-hover:rotate-2 motion-reduce:transition-none",
                    shape.fill,
                  )}
                >
                  <path d={shape.path} />
                </svg>
                <span
                  className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-[clamp(1.75rem,1rem+1.7vw,2.75rem)] leading-[1.45] tracking-wide whitespace-nowrap lowercase"
                  style={{ left: shape.label.x, top: shape.label.y }}
                >
                  <span className="sr-only">{service.name}</span>
                  {shape.label.lines.map((line) => (
                    <span key={line} aria-hidden="true">
                      {line}
                    </span>
                  ))}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
