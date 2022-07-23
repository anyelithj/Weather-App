import React from "react";

export function ResultsOperation(props) {
	return (
		<div className="search-results">
			<div className="search-results__map">
				<iframe
					src={props.coord}
					width="600"
					height="450"
					style={{
						border: "0",
					}}
					allowfullscreen=""
					loading="lazy"
					referrerpolicy="no-referrer-when-downgrade" />
			</div>
			<div className="search-results__info">
				<h5>{props.dateStr}</h5>
				{props.apiInfo?.icon && props.apiInfo?.temp && (
					<>
						<span>
							{props.apiInfo?.country} - {props.apiInfo?.city}
						</span>{" "}
						<br />
						<span>
							<img src={props.apiInfo?.icon} alt="" />{" "}
							<span>{props.apiInfo?.temp}</span>
						</span>
					</>
				)}
			</div>
		</div>
	);
}
