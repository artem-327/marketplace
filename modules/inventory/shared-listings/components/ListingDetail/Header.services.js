

export const submitHandler = async (values, props) => {
  const body = {
    priceAddition: values.priceAddition,
    priceMultiplier: parseFloat(values.priceMultiplier),
    priceOverride: values.priceOverride
  }

  try {
    props.updateMarkUp(values.id, body)
  } catch (e) {
    console.error(e)
  }
}