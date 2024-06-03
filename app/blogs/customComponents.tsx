import React from "react";

const customComponents = {
  h1: (props: React.HTMLAttributes<HTMLElement>) => <h1 className="text-6xl font-bold text-customblue">{props.children}</h1>,
  h2: (props: React.HTMLAttributes<HTMLElement>) => <h2 className="text-4xl font-bold text-customblack">{props.children}</h2>,
  h3: (props: React.HTMLAttributes<HTMLElement>) => <h3 className="text-3xl font-bold text-customblack">{props.children}</h3>,
  h4: (props: React.HTMLAttributes<HTMLElement>) => <h4 className="text-2xl font-bold text-customblack">{props.children}</h4>,

  p: (props: React.HTMLAttributes<HTMLElement>) => <p className="text-lg text-customblack">{props.children}</p>,

  ul: (props: React.HTMLAttributes<HTMLElement>) => <ul className="list-disc list-inside my-4 pl-4">{props.children}</ul>,
  ol: (props: React.HTMLAttributes<HTMLElement>) => <ol className="list-decimal list-inside my-4 pl-4">{props.children}</ol>,
  li: (props: React.HTMLAttributes<HTMLElement>) => <li className="text-lg text-customblack">{props.children}</li>,
}

export default customComponents;